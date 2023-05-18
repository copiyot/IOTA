import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000',
  });

  const config = new DocumentBuilder()
    .setTitle('Supply Chain API Doc')
    .setDescription('IOTA takeaway assignment API documentaion')
    .setVersion('1.0')
    .addTag('IOTA')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app
    .listen(4040)
    .then(() => {
      console.log('successfully stared on port 4040');
    })
    .catch((error) => {
      console.log(error);
    });
}
bootstrap();
