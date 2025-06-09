import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/update')
  @HttpCode(HttpStatus.OK)
  async update(
    @Body() data: { username: string; password: string; id: number },
  ) {
    const { username, password, id } = data;
    const hashedPassword = await bcrypt.hash(password, 10);

    if (/^(?=.*\d)(?=.*[A-z])[\da-zA-Z]{8}$/.test(password) === false) {
      throw new BadRequestException('密码格式错误');
    }

    if (username && /^(?=.*[a-zA-Z]).{4,16}$/.test(username) === false) {
      throw new BadRequestException('用户名格式错误');
    }

    const existUser = await this.userService.findOneByUsername(username);
    if (existUser && existUser.id !== id) {
      throw new BadRequestException('用户名已使用');
    }

    await this.userService.update(id, {
      username: username === '' ? undefined : username,
      password: hashedPassword
    });

    return { message: '修改成功' };
  }


  @Post("/subscription")
  async subscription(@Body() data: {  email?: string; code?: string; isActive?: boolean; id: number}) {
    const { email, isActive, id } = data
    await this.userService.update(id, {
      email,
      isActive,
    });

    return {
       message: '修改成功'
    }
  }

  @Get(':id')
  async getUserInfo(@Param('id') id: string) {
    return await this.userService.findOne(Number(id));
  }
}
