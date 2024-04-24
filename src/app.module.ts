import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AxiosModule } from './axios/axios.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AxiosModule,
    ClientsModule.register([
      {
        name: 'OPERATOR_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.OPERATOR_SERVICE_HOST || 'localhost',
          port: 3031,
        },
      },
      {
        name: 'HOTEL_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.HOTEL_SERVICE_HOST || 'localhost',
          port: 3032,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
