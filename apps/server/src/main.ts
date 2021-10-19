/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /*
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          'default-src': ["'self'"],
          'frame-ancestors': [
            "'self'",
            `https://mc.${process.env.STACK}.exacttarget.com`,
            `https://jbinteractions.${process.env.STACK}.marketingcloudapps.com`,
          ],
        },
      },
    })
  );
  */

  app.enableCors({
    origin: [
      'http://localhost:3333',
      'http://localhost:4200',
      `https://mc.${process.env.STACK}.exacttarget.com`,
      `https://jbinteractions.${process.env.STACK}.marketingcloudapps.com`,
    ],
    credentials: true,
  });

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
