// src/mail/mail.service.ts
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendOrderConfirmation(email: string, order: any): Promise<void> {
    const { no, service, clientName, clientAddress, clientTel, createdAt } = order;
    await this.mailerService.sendMail({
      to: email,
      subject: '新维修订单',
      template: './order-confirmation', // 对应模板文件
      context: { 
        no, service, clientName, clientAddress, clientTel, createdAt
      },
    });
  }
}