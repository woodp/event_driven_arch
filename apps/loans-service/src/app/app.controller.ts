import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async createLoan() {
    await this.appService.createLoan();
    return { success: true };
  }

  @Post('notifications')
  async toggleNotifications(@Body() body) {
    await this.appService.toggleNotifications(body);
    return { success: true };
  }
}
