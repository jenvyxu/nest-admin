import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Status } from './types/status';
import { generateOrderNo } from 'src/utils';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}
  async create(createOrderDto: CreateOrderDto) {
    return await this.prisma.order.create({
      data: {
        no: generateOrderNo(),
        ...createOrderDto,
      },
    });
  }

  async getCount() {
    const allCount = await this.prisma.order.count({
      where: {
        deletedAt: null,
      },
    });

    const reviewCount = await this.prisma.order.count({
      where: {
        deletedAt: null,
        status: Status.review,
      },
    });

    const processCount = await this.prisma.order.count({
      where: {
        deletedAt: null,
        status: Status.process,
      },
    });

    const createdCount = await this.prisma.order.count({
      where: {
        deletedAt: null,
        status: Status.created,
      },
    });

    return {
      allCount,
      reviewCount,
      processCount,
      createdCount,
    };
  }

  async findOne(id: number) {
    return await this.prisma.order.findUnique({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  async update(id: number, data: Omit<UpdateOrderDto, 'id'>) {
    const { expireAt, finishAt, visitAt, ...rest } = data;
    const pendingData: Record<string, any> = { ...rest };
    if (typeof expireAt === 'string') {
      pendingData.expireAt = new Date(data.expireAt);
    }
    if (typeof finishAt === 'string') {
      pendingData.finishAt = new Date(data.finishAt);
    }
    if (typeof visitAt === 'string') {
      pendingData.visitAt = new Date(data.visitAt);
    }

    return await this.prisma.order.update({
      where: { id, deletedAt: null },
      data: pendingData,
    });
  }

  async query(data: {
    visitAt?: string;
    createdAt?: string;
    engineerId?: number;
    no?: string;
  }) {
    const { visitAt, createdAt, engineerId, no } = data;
    return await this.prisma.order.findMany({
      where: {
        visitAt: visitAt ? new Date(visitAt) : undefined,
        createdAt: createdAt ? new Date(createdAt) : undefined,
        engineerId,
        no,
        deletedAt: null,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.order.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async findAll({ status }: { status: Status }) {
    return await this.prisma.order.findMany({
      where: {
        status,
        deletedAt: null,
      },
    });
  }

  async getList(query: { lastId?: number; size?: number; status?: Status }) {
    const { lastId, size = 40, status } = query;

    if (status) {
      if (lastId !== undefined) {
        return await this.prisma.order.findMany({
          take: size,
          skip: 1,
          cursor: { id: lastId },
          where: {
            deletedAt: null,
            status,
          },
          orderBy: {
            id: 'asc',
          },
        });
      }

      return await this.prisma.order.findMany({
        take: size,
        where: {
          deletedAt: null,
          status,
        },
        orderBy: {
          id: 'asc',
        },
      });
    }

    if (lastId !== undefined) {
      return await this.prisma.order.findMany({
        take: size,
        skip: 1,
        cursor: { id: lastId },
        where: {
          deletedAt: null,
        },
        orderBy: {
          id: 'asc',
        },
      });
    }

    return await this.prisma.order.findMany({
      take: size,
      where: {
        deletedAt: null,
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  async getListByPage({
    skip = 0,
    take = 40,
    status,
  }: {
    skip: number;
    take: number;
    status?: Status;
  }) {
    return await this.prisma.order.findMany({
      take,
      skip,
      where: {
        deletedAt: null,
        status,
      },
      orderBy: {
        id: 'asc',
      },
    });
  }
}
