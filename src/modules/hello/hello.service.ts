// 处理前端请求的业务逻辑
import { Injectable } from '@nestjs/common';

// 装饰器：将一个类变成一个可以注入的服务
@Injectable()
export class HelloService {
  getHelloById(): string {
    return 'Hello World!';
  }
}
