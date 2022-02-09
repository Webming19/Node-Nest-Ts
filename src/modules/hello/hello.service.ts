// 处理前端请求的业务逻辑
import { Injectable } from '@nestjs/common';

// 装饰器：将一个类变成一个可以注入的服务
@Injectable()
export class HelloService {
  getHelloById(id): string {
    return `Hello Nest! \n id: ${id}`;
  }

  save(msg: string): string {
    return `Save Message: ${msg}`;
  }

  remove(id: string): string {
    return `Delete By Id : ${id}`;
  }

  update(id: string, msg: string): string {
    return `Update id: ${id}, Message: ${msg}`;
  }
}
