// 处理前端请求，从service中引入业务逻辑
import { Controller, Get, Query } from '@nestjs/common';
import { HelloService } from './hello.service';

@Controller()
export class HelloController {
  // 使用constructor注入到一个对象中
  constructor(private readonly helloService: HelloService) {}

  // Get请求的处理
  @Get()
  fetch(): string {
    return this.helloService.getHelloById();
  }
}
