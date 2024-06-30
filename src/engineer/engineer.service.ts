import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEngineerDto } from './dto/create-engineer.dto';
import { UpdateEngineerDto } from './dto/update-engineer.dto';

@Injectable()
export class EngineerService {
  constructor(private prisma: PrismaService) {}

  async create(createEngineerDto: CreateEngineerDto) {
    return await this.prisma.engineer.create({
      data: createEngineerDto,
    });
  }

  findOne(id: number) {
    return this.prisma.engineer.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateEngineerDto: Omit<UpdateEngineerDto, 'id'>) {
    return this.prisma.engineer.update({
      where: { id },
      data: updateEngineerDto,
    });
  }

  remove(id: number) {
    return this.prisma.engineer.delete({
      where: { id },
    });
  }

  async findAll() {
    return await this.prisma.engineer.findMany({
      where: {
        deletedAt: null,
      },
    });
  }

  async getList(data: { size?: number; lasdId?: number }) {
    const { size = 40, lasdId } = data;
    if (lasdId !== undefined) {
      return await this.prisma.engineer.findMany({
        take: size,
        skip: 1,
        cursor: {
          id: lasdId,
        },
        where: {
          deletedAt: null,
        },
        orderBy: {
          id: 'asc',
        },
      });
    }

    return await this.prisma.engineer.findMany({
      take: size,
      where: {
        deletedAt: null,
      },
      orderBy: {
        id: 'asc',
      },
    });
  }
}
