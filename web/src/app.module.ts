import { ServeStaticModule } from '@nestjs/serve-static';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'build'),
      renderPath: '*',
      serveRoot: '/app',
      exclude: ['api/*'],
      serveStaticOptions: {
        cacheControl: true,
        maxAge: 5,
        index: false,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
