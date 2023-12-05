import { Body, Controller, Post } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async createLoan(@Body() body) {
    await this.appService.createLoan(body.type);
    return { success: true };
  }

  @Post('batch')
  async createLoansBatch(@Body() body) {
    await this.appService.createLoansBatch(body.quantity);
    return { success: true };
  }

}
