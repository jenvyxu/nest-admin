import { Module } from '@nestjs/common';
import { EngineerController } from './engineer.controller';
import { EngineerService } from './engineer.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EngineerController],
  providers: [EngineerService],
})
export class EngineerModule {}
