import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { addSalt, encript } from '../utils/encription';

@Injectable()
export class HashPasswordMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    let userPassword = req.body['password'];
    let newPassword = req.body['newPassword'];
    if (newPassword) {
      const salt = addSalt();
      newPassword = encript(newPassword, salt);
      console.log('newPassword-crypto==>', newPassword);
      req.body['newPassword'] = newPassword;
      req.body['salt'] = salt;
    } else if (userPassword) {
      const salt = addSalt();
      userPassword = encript(userPassword, salt);
      req.body['password'] = userPassword;
      req.body['salt'] = salt;
    }
    next();
  }
}
