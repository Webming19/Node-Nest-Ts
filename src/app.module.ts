import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// 模块引入，与import的区别是：解耦了引入模块与业务逻辑的关系
@Module({
  // 引入模块
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
