import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Public } from '../auth/decorators/public.decorator';
import { Status } from './types/status';

@Public()
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}
  @Post('add')
  async addOrder(@Body() order: CreateOrderDto) {
    await this.orderService.create(order);
  }

  @Delete('delete/:id')
  async removeOrder(@Param('id') id: string) {
    await this.orderService.remove(Number(id));
  }

  @Post('update')
  async updateOrder(@Body() order: UpdateOrderDto) {
    const { id, ...udpateData } = order;
    console.log('udpateData', udpateData);
    await this.orderService.update(id, udpateData);
  }

  @Get('list')
  async getOrderList(
    @Query() data: { lastId?: string; size?: string; status?: string },
  ) {
    console.log(data);
    let lastId, size;

    if (data.lastId === undefined || data.lastId === '') {
      lastId = undefined;
    } else {
      try {
        lastId = parseInt(data.lastId);
      } catch (e) {
        lastId = undefined;
      }
    }

    if (data.size === undefined || data.size === '') {
      data.size === undefined;
    } else {
      try {
        size = parseInt(data.size);
      } catch (e) {
        size = undefined;
      }
    }

    return await this.orderService.getList({
      lastId,
      size,
      status: data.status as Status,
    });
  }

  @Get('count')
  async getOrderCount() {
    return await this.orderService.getCount();
  }

  @Post('query')
  async queryOrder(
    @Body()
    data: {
      visitAt?: string;
      createdAt?: string;
      engineerId?: number;
      no?: string;
    },
  ) {
    const result = await this.orderService.query(data);
    console.log(result);
    return result;
  }

  @Get(':id')
  async getOrder(@Param('id') id: string) {
    return await this.orderService.findOne(Number(id));
  }
}
