import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserController } from './user.controller';

@Module({
  imports: [PrismaModule],
  providers: [UserService, AuthService, JwtService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
