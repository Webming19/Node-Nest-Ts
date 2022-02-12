import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/interface/user.interface';

@Injectable()
export class UserService {
  constructor(
    // 引入之前定义的Model：USER_MODEL；并且是私有的只读，他是一个由User生成的Model类型的类
    @InjectModel('USER_MODEL') private readonly userModel: Model<User>,
  ) {}

  /**
   * 注册方法
   * @date 2022/02/10
   * @param user
   * @returns {Promise<any>}
   */
  public async regist(user: User) {
    return this.userModel
      .find({
        username: user.username,
      })
      .then((res) => {
        if (res.length) {
          console.log('用户名已存在');
          throw Error('用户已注册');
        }
      })
      .then(() => {
        try {
          const createUser = new this.userModel(user);
          return createUser.save();
        } catch (error) {
          throw Error('用户注册失败' + error);
        }
      })
      .catch((err) => {
        console.warn(`出现错误:${err}`);
      });
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
}
