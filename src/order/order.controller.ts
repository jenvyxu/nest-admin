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
import { Status } from './types/status';
import { FromMachine } from 'src/auth/decorators/machine.decorator';

// @Public()
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}
  @HttpCode(HttpStatus.OK)
  @FromMachine()
  @Post('add')
  async addOrder(@Body() order: CreateOrderDto) {
    return await this.orderService.create(order);
  }

  @Delete('delete/:id')
  async removeOrder(@Param('id') id: string) {
    return await this.orderService.remove(Number(id));
  }

  @Post('update')
  async updateOrder(@Body() order: UpdateOrderDto) {
    const { id, ...udpateData } = order;
    return await this.orderService.update(id, udpateData);
  }

  @HttpCode(HttpStatus.OK)
  @Post('page')
  async getOrderListByPage(
    @Body()
    data: {
      page?: number;
      size?: number;
      status?: string;
      skip?: boolean;
    },
  ) {
    console.log(data);
    const { page = 0, size = 40, status } = data;
    return await this.orderService.getListByPage({
      take: size,
      skip: page * size,
      status: status as Status,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Get('list')
  async getOrderList(
    @Query()
    data: {
      status?: string;
    },
  ) {
    console.log(data);
    const { status } = data;
    // const isValidStatus =
    //   status &&
    //   [
    //     Status.created,
    //     Status.process,
    //     Status.fail,
    //     Status.review,
    //     Status.complete,
    //   ].includes(status as Status);
    // if (!isValidStatus) {
    //   throw new Error('status 参数错误');
    // }
    return await this.orderService.findAll({
      status: status as Status,
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
      tel?: string;
    },
  ) {
    const result = await this.orderService.query(data);
    return result;
  }

  @Get(':id')
  async getOrder(@Param('id') id: string) {
    return await this.orderService.findOne(Number(id));
  }
}
