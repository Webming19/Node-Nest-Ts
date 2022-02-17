import { Body, Controller, Get, Patch, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/interface/user.interface';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('鉴权模块')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @ApiQuery({ name: 'username', example: 'hxd', required: true })
  @ApiQuery({ name: 'password', example: '654321' })
  @ApiOperation({
    summary: '用户登录',
  })
  async login(@Query() { username, password }) {
    return await this.authService.login({ username, password });
  }

  @Patch()
  @ApiOperation({
    summary: '用户修改密码',
  })
  async changePassword(@Body() user: User) {
    return await this.authService.changePassword(user);
  }
}
