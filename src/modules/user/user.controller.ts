import {
  Body,
  Controller,
  Get,
  Query,
  Post,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/interface/user.interface';
import { AuthGuard } from '@nestjs/passport';

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

  @Delete('delete')
  @ApiQuery({ name: 'username', example: 'wzk', required: true })
  @ApiOperation({
    summary: '删除用户',
  })
  async remove(@Query() { username }) {
    return await this.userService.remove(username);
  }

  @Get('hello')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('jwt')
  hello() {
    return 'hello Nest!';
  }
}
