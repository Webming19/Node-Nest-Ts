import { Injectable, Logger } from '@nestjs/common';
import { ResponseInterface } from '../interface/response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../interface/user.interface';
import { encript, addSalt } from '../utils/encription';

const logger = new Logger('auth.service');

@Injectable()
export class AuthService {
  private response: ResponseInterface;
  constructor(
    // 引入之前定义的Model：USER_MODEL；并且是私有的只读，他是一个由User生成的Model类型的类
    @InjectModel('USER_MODEL') private readonly userModel: Model<User>,
  ) {}

  /**
   * 按照用户名查询用户
   * @param username
   * @returns {Promise<Query<Array<HydratedDocument<User, {}, {}>>, User & {_id: User["_id"]}, {}, User>>}
   */
  private async findUser(username: string) {
    return this.userModel.find({ username });
  }

  /**
   * 用户鉴权
   * @param userPassword
   * @param dbUser
   * @returns {boolean}
   */
  private authentication = (userPassword: string, dbUser: User): boolean =>
    encript(userPassword, dbUser.salt) === dbUser.password;

  /**
   * 用户登录
   * @param user
   * @returns {Promise<void>}
   */
  public async login(user) {
    return await this.findUser(user.username)
      .then((res) => {
        if (!res.length) {
          this.response = { code: 400, msg: '该用户不存在' };
          throw this.response;
        }
        return res[0];
      })
      .then((dbUser: User) => {
        const isPass = this.authentication(user.password, dbUser);
        if (isPass) {
          this.response = { code: 200, msg: '登陆成功！' };
          return this.response;
        } else {
          this.response = { code: 400, msg: '用户名或密码错误' };
          throw this.response;
        }
      })
      .catch((err) => {
        logger.warn(`登陆失败，失败原因：${err.msg}`);
        return this.response;
      });
  }

  public async changePassword(user: User) {
    let salt: string;
    await this.findUser(user.username).then((res) => {
      salt = res[0].salt;
    });
    const newSalt = addSalt();
    const password = encript(user.password, salt);
    const newPassword = encript(user.newPassword, newSalt);
    return this.userModel
      .updateOne(
        { username: user.username, password },
        { $set: { password: newPassword, salt: newSalt } },
      )
      .then((res) => {
        if (res.modifiedCount) {
          this.response = { code: 200, msg: '密码修改成功，重新登陆。' };
          return this.response;
        } else {
          this.response = { code: 400, msg: '用户名或旧密码错误！' };
          throw this.response;
        }
      })
      .catch((err) => {
        logger.warn(`用户${user.username}修改密码失败，失败原因：${err.msg}`);
        return err;
      });
    // 这是一个低级的方法，双层Promise嵌套，可以实现功能，但是比较混乱
    /*return await this.findUser(user.username)
      .then((res) => {
        if (!res.length) {
          this.response = { code: 400, msg: '该用户不存在' };
          throw this.response;
        }
        return res[0];
      })
      .then((dbUser: User) => {
        const isPass = this.authentication(user.password, dbUser);
        if (isPass) {
          const salt = addSalt();
          const newPassword = encript(user.newPassword, salt);
          try {
            return this.userModel
              .updateOne(
                { username: user.username },
                { $set: { password: newPassword, salt } },
              )
              .then((res) => {
                if (res.modifiedCount) {
                  this.response = {
                    code: 200,
                    msg: '密码修改成功，重新登陆。',
                  };
                  return this.response;
                }
              });
          } catch (err) {
            this.response = {
              code: 400,
              msg: err,
            };
            return this.response;
          }
        } else {
          this.response = { code: 400, msg: '用户名或旧密码错误' };
          throw this.response;
        }
      })
      .catch((err) => {
        logger.warn(`用户${user.username}修改密码失败，失败原因：${err.msg}`);
        return this.response;
      });*/
  }
}
