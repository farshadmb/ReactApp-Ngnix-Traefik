import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  printHello() {
    return this.appService.getHello();
  }

  @Get('bye')
  printBye() {
    return this.appService.getBye();
  }
}
