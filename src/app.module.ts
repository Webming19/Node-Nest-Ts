import { Module } from '@nestjs/common';
import { HelloModule } from './modules/hello/hello.module';
import { DbModule } from './db/db.module';
import { UserModule } from './modules/user/user.module';

// 模块引入，与import的区别是：解耦了引入模块与业务逻辑的关系
@Module({
  // 引入模块
  imports: [HelloModule, DbModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
