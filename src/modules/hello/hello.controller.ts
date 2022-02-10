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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('/hello')
@ApiTags('hello模块')
export class HelloController {
  // 使用constructor注入到一个对象中
  constructor(private readonly helloService: HelloService) {}

  // Get请求的处理
  @Get()
  @ApiOperation({
    summary: 'Get测试接口',
  })
  fetch(@Query() { id }, @Headers('token') token): string {
    console.log('token==>', token);
    return this.helloService.getHelloById(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Post测试接口',
  })
  save(@Body() { msg }): string {
    return this.helloService.save(msg);
  }

  @Delete()
  @ApiOperation({
    summary: 'Delete测试接口',
  })
  delete(@Query() { id }): string {
    return this.helloService.remove(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Patch测试接口',
  })
  update(@Param() { id }, @Body() { msg }): string {
    return this.helloService.update(id, msg);
  }
}
