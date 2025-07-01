import { Controller, Get } from '@nestjs/common';

@Controller()
export class SayHelloController {
  @Get()
  SayHello() {
    return 'Hello World';
  }
}
