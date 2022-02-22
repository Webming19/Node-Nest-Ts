import { Body, Controller, Get, Patch, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/interface/user.interface';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('鉴权模块')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  @ApiQuery({ name: 'username', example: 'hxd', required: true })
  @ApiQuery({ name: 'password', example: '654321' })
  @ApiOperation({
    summary: '用户登录',
  })
  async login(@Req() { user }) {
    return await this.authService.login(user);
  }

  @Patch('change')
  @ApiOperation({
    summary: '用户修改密码',
  })
  async changePassword(@Body() user: User) {
    return await this.authService.changePassword(user);
  }
}
