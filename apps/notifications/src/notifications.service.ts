import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  notifyEmail(data: any) {
    console.log('notifyEmail', data);
  }
}
