import { Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { Job } from "bull";

@Processor('notifications')
export class AppConsumer {
  private readonly logger = new Logger(AppConsumer.name);

    @Process()
    async handleNotifications(job: Job<unknown>) {
      console.log('got here')
      this.logger.log(`Notification proccessed ${JSON.stringify(job.data)}`)
    }
}