import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop()
  @ApiProperty({
    description: '用户名',
    example: 'hxd',
  })
  readonly username: string;

  @Prop()
  @ApiProperty({
    description: '密码',
    example: '654321',
  })
  readonly password: string;

  @Prop()
  @ApiProperty({
    description: '新密码',
    example: '123456',
    required: false,
  })
  readonly newPassword?: string;

  /*@Prop()
  @ApiProperty({
    description: '删除用户名',
    example: 'wzk',
    required: false,
  })
  readonly removeUsername?: string;*/

  @Prop()
  readonly salt?: string;
}
