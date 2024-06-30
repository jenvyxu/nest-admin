import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserInput: any) {
    return await this.prisma.user.create({
      data: createUserInput,
    });
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOneByUsername(username: string) {
    return await this.prisma.user.findUnique({
      where: { username },
    });
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateUserInput: any) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserInput,
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
