import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MailService } from 'src/mail/mail.service';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [PrismaModule],
  providers: [OrderService, MailService, UserService],
  controllers: [OrderController],
})
export class OrderModule {}
