import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { addSalt, encript } from '../utils/encription';
import { UserService } from '../modules/user/user.service';
import * as url from 'url';

@Injectable()
export class HashPasswordMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    let userPassword = req.body['password'];
    let newPassword = req.body['newPassword'];
    const salt = addSalt();
    switch (req.method) {
      case 'GET':
        // 登录
        let dbSalt: string;
        const username: string = <string>(
          url.parse(req.url, true).query['username']
        );
        await this.userService.findUser(username).then((_) => {
          dbSalt = _[0].salt;
        });
        userPassword = encript(
          <string>url.parse(req.url, true).query['password'],
          dbSalt,
        );
        req['user'] = { username, password: userPassword };
        break;
      case 'POST':
        // 注册
        userPassword = encript(userPassword, salt);
        req.body['password'] = userPassword;
        req.body['salt'] = salt;
        break;
      case 'PATCH':
        // 修改密码
        newPassword = encript(newPassword, salt);
        const oldPassword = await this.userService.findUser('');
        req.body['password'] = oldPassword;
        req.body['newPassword'] = newPassword;
        req.body['salt'] = salt;
        break;
      default:
        console.log('default');
    }
    /*if (newPassword) {
      // 修改密码
      const salt = addSalt();
      newPassword = encript(newPassword, salt);
      req.body['newPassword'] = newPassword;
      req.body['salt'] = salt;
    } else {
      const salt = addSalt();
      userPassword = encript(userPassword, salt);
      req.body['password'] = userPassword;
      req.body['salt'] = salt;
    }*/
    next();
  }
}
