// 处理前端请求，从service中引入业务逻辑
import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Query,
  Headers,
  Body,
  Param,
} from '@nestjs/common';
import { HelloService } from './hello.service';

@Controller('/hello')
export class HelloController {
  // 使用constructor注入到一个对象中
  constructor(private readonly helloService: HelloService) {}

  // Get请求的处理
  @Get()
  fetch(@Query() { id }, @Headers('token') token): string {
    console.log('token==>', token);
    return this.helloService.getHelloById(id);
  }

  @Post()
  save(@Body() { msg }): string {
    return this.helloService.save(msg);
  }

  @Delete()
  delete(@Query() { id }): string {
    return this.helloService.remove(id);
  }

  @Patch(':id')
  update(@Param() { id }, @Body() { msg }): string {
    return this.helloService.update(id, msg);
  }
}
