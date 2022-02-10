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
}
