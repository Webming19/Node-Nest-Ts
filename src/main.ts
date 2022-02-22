import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { Log4jsLogger } from '@nestx-log4js/core';

const logger = new Logger('main.ts');
const listenPoint = 3000;

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API文档标题')
    .setDescription('API文档介绍')
    .setVersion('1.0')
    .addTag('App总模块')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'jwt',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useLogger(app.get(Log4jsLogger));

  await app.listen(listenPoint);
};

bootstrap().then(() => {
  logger.log(`listen in http://localhost:${listenPoint}/api`);
});
