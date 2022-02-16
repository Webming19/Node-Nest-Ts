import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/interface/user.interface';
import { ResponseInterface } from '../../interface/response.interface';

const logger = new Logger('user.service');

@Injectable()
export class UserService {
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
   * 注册方法
   * @date 2022/02/10
   * @param user
   * @returns {Promise<User | void>}
   */
  public async regist(user: User) {
    return this.findUser(user.username)
      .then((res) => {
        if (res.length) {
          this.response = {
            code: 406,
            msg: '用户名已被占用',
          };
          throw this.response;
        }
      })
      .then(async () => {
        try {
          const createUser = new this.userModel(user);
          await createUser.save();
          this.response = {
            code: 200,
            msg: '用户注册成功！',
          };
          return this.response;
        } catch (error) {
          this.response = {
            code: 406,
            msg: '用户注册失败，错误详情：' + error,
          };
          throw this.response;
        }
      })
      .catch((err) => {
        logger.warn(`用户${err.usermane}注册失败，错误信息:${err.msg}`);
      })
      .finally(() => this.response);
  }

  /**
   * 用户登录
   * @date 2022/02/11
   * @param user
   * @returns {Promise<any>}
   */
  public async login(user) {
    return this.userModel
      .find({
        username: user.username,
        password: user.password,
      })
      .then((res) => {
        if (res.length) {
          console.log('登陆成功==>', res);
        } else {
          console.log('用户名或密码错误==>', res);
        }
      })
      .catch((err) => {
        console.log(`出现错误：${err}，请重试`);
      });
  }

  /**
   * 修改密码
   * @param user
   * @returns {Promise<any>}
   */
  public async change(user: User) {
    return this.userModel
      .updateOne(
        {
          username: user.username,
          password: user.password,
        },
        { $set: { password: user.newPassword } },
      )
      .then((res) => {
        if (res.modifiedCount) {
          console.log('修改成功，重新登陆==>', res);
        } else {
          console.log('旧密码错误==>', res);
        }
      })
      .catch((err) => {
        console.log(`出现错误：${err}，请重试`);
      });
  }

  /**
   * 删除用户
   * @param username
   * @returns {Promise<any>}
   */
  public async remove(username: string) {
    return this.userModel
      .deleteOne({ username })
      .then((res) => {
        if (res.deletedCount) {
          console.log('删除成功==>', res);
        } else {
          console.log('该用户不存在==>', res);
        }
      })
      .catch((err) => {
        console.log(`出现错误：${err}，请重试`);
      });
  }
}
