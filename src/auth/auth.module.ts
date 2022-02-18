import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONSTANT } from './jwt.constant';
import { UserService } from 'src/modules/user/user.service';
import { JwtStrategy } from './jwt.strategy';
import { HashPasswordMiddleware } from '../middlewares/hash-password.middleware';

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_CONSTANT.secret,
    }),
  ],
  providers: [AuthService, UserService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(HashPasswordMiddleware).forRoutes('auth');
  }
}
