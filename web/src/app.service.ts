import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getBye() {
    return 'Bye';
  }
  getHello(): string {
    return 'Hello World!';
  }
}
