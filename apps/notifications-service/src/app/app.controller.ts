import { Body, Controller, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('create_notification')
  public async createToken(@Payload() data: any): Promise<any> {
    console.log('Notification message received');
    console.log(JSON.stringify(data));
    return this.appService.createNotification(data);
  }

  @Post() 
  public async toggleMode (@Body() body) {
    await this.appService.toggleMode(body.mode);
  }
}
