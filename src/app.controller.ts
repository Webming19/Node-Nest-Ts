// 处理前端请求，从service中引入业务逻辑
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // 使用constructor注入到一个对象中
  constructor(private readonly appService: AppService) {}

  // Get请求的处理
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
