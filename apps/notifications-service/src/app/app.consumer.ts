import { Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { Job } from "bull";

@Processor('notifications')
export class AppConsumer {
  private readonly logger = new Logger(AppConsumer.name);

    @Process()
    async handleNotifications(job: Job<unknown>) {
      console.log(`${JSON.stringify(job)}`)
      this.logger.log(`Notification proccessed ${JSON.stringify(job.data)}`)
      /*
      {
        "id": "6",
        "name": "__default__",
        "data": { 
          "message": "Loan crated", 
          "status": "succeed", 
          "delay": 100 
        },
        "opts": { "attempts": 1, "delay": 0, "timestamp": 1700172133232 },
        "progress": 0,
        "delay": 0,
        "timestamp": 1700172133232,
        "attemptsMade": 0,
        "stacktrace": [],
        "returnvalue": null,
        "finishedOn": null,
        "processedOn": 1700172133430
      }
      */
    }
}