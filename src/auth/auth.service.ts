import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/interface/user.interface';
import * as bcrypt from 'bcrypt';
import { AccessToken } from './types/AccessToken';
import { RegisterRequestDto } from './dtos/register-request.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user: User = await this.userService.findOneByUsername(username);
    console.log(user);
    if (!user) {
      throw new BadRequestException('用户不存在');
    }
    const isMatch: boolean = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('密码错误');
    }
    return user;
  }

  async login(user: User) {
    const payload = { username: user.username, id: user.id };
    return { access_token: this.jwtService.sign(payload), user };
  }

  async register(user: RegisterRequestDto): Promise<AccessToken> {
    const existingUser = await this.userService.findOneByUsername(
      user.username,
    );
    console.log(existingUser);
    if (existingUser) {
      throw new BadRequestException('用户名已存在');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    const createUser = { ...user, password: hashedPassword };
    const newUser = await this.userService.create(createUser);
    return this.login(newUser);
  }
}
