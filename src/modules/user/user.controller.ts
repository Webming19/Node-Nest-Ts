import { Body, Controller, Get, Query, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { User } from 'src/interface/user.interface';

@Controller('user')
@ApiTags('用户模块')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('regist')
  @ApiOperation({
    summary: '用户注册',
  })
  async registUser(@Body() userDto: User) {
    return await this.userService.regist(userDto);
  }

  @Get('login')
  @ApiQuery({ name: 'username', example: 'hxd', required: true })
  @ApiQuery({ name: 'password', example: '654321' })
  @ApiOperation({
    summary: '用户登录',
  })
  async userLogin(@Query() { username, password }) {
    return await this.userService.login({ username, password });
  }

  @Patch('change')
  @ApiOperation({
    summary: '用户修改密码',
  })
  async changePassword(@Body() userDto: User) {
    return await this.userService.change(userDto);
  }
}
