import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  BadRequestException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RegisterRequestDto } from './dtos/register-request.dto';
import { LoginResponseDTO } from './dtos/login-response.dto';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Request() req): Promise<LoginResponseDTO | BadRequestException> {
    return this.authService.login(req.user);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() registerBody: RegisterRequestDto) {
    return this.authService.register(registerBody);
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout() {}
}
