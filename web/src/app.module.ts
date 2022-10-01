import { ServeStaticModule } from '@nestjs/serve-static';
import { Module } from '@nestjs/common';
import config from './config.json';
import { join } from 'path';

let serveConfig: any = {
  rootPath: join(__dirname, '../../', 'app'),
  renderPath: '*',
  serveRoot: '/app',
  exclude: ['api/*'],
  serveStaticOptions: {
    cacheControl: true,
    maxAge: 5,
    index: false,
  },
};

serveConfig = config && Object.keys(config).length != 0 ? config : serveConfig;
@Module({
  imports: [ServeStaticModule.forRoot(serveConfig)],
  controllers: [],
  providers: [],
})
export class AppModule {}
