import 'dotenv/config';
import { VersioningType, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllConfigType } from './config/config.type';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { useContainer } from 'class-validator';

let app;

export default async function handler(req, res) {
  // Bootstrap our NestJS app on cold start
  if (!app) {
    app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService<AllConfigType>);

    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    app.enableShutdownHooks();
    app.setGlobalPrefix(
      configService.getOrThrow('app.apiPrefix', { infer: true }),
      {
        exclude: ['/'],
      },
    );
    app.enableVersioning({
      type: VersioningType.URI,
    });
    
    const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['https://gradapin.vercel.app'];

  // Enable CORS for Next Web App
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

    // Set up Swagger if you're using it
    const config = new DocumentBuilder()
    .setTitle('Gradapin API')
    .setDescription('Gradapin API Docs')
    .setVersion('1.0')
    .build();
    const document = SwaggerModule.createDocument(app, config);

    app.useGlobalPipes(
      new ValidationPipe({
        // Require decorator for field to be present
        whitelist: true,

        // Use class-transformer
        transform: true,

        // Use validator and transformer in response
        always: true,
      }),
    );

    SwaggerModule.setup('docs', app, document);

    // This is important
    await app.init();
  }
  const adapterHost = app.get(HttpAdapterHost);
  const httpAdapter = adapterHost.httpAdapter;
  const instance = httpAdapter.getInstance();

  instance(req, res);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<AllConfigType>);

  app.enableShutdownHooks();
  app.setGlobalPrefix(
    configService.getOrThrow('app.apiPrefix', { infer: true }),
    {
      exclude: ['/'],
    },
  );
  app.enableVersioning({
    type: VersioningType.URI,
  });
  
  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['https://gradapin.vercel.app'];

    // Set up Swagger if you're using it
    const config = new DocumentBuilder()
    .setTitle('Gradapin API')
    .setDescription('Gradapin API Docs')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  
  // Enable CORS for Next Web App
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  
  await app.listen(configService.getOrThrow('app.port', { infer: true }));
}

bootstrap();
