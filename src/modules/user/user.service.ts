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
   * @description 注册方法
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
}
