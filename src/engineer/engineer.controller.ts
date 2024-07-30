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
} from '@nestjs/common';
import { CreateEngineerDto } from './dto/create-engineer.dto';
import { UpdateEngineerDto } from './dto/update-engineer.dto';
import { EngineerService } from './engineer.service';
import { Public } from '../auth/decorators/public.decorator';

// @Public()
@Controller('engineer')
export class EngineerController {
  constructor(private engineerService: EngineerService) {}
  @HttpCode(HttpStatus.OK)
  @Post('add')
  async addEngineer(@Body() engineer: CreateEngineerDto) {
    return await this.engineerService.create(engineer);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('delete/:id')
  async removeEngineer(@Param('id') id: string) {
    return await this.engineerService.remove(Number(id));
  }

  @Post('update')
  async updateEngineer(@Body() engineer: UpdateEngineerDto) {
    const { id, ...udpateData } = engineer;
    await this.engineerService.update(id, udpateData);
  }

  // @Get('list')
  // async getAllEngieer(@Query() query: { size?: string; lastId?: string }) {
  //   let size: number;
  //   let lasdId: number;

  //   if (query.size) {
  //     try {
  //       size = parseInt(query.size);
  //     } catch {
  //       size = 40;
  //     }
  //   }

  //   if (query.lastId) {
  //     try {
  //       lasdId = parseInt(query.lastId);
  //     } catch {
  //       lasdId = undefined;
  //     }
  //   }

  //   return await this.engineerService.getList({ size, lasdId });
  // }

  @HttpCode(HttpStatus.OK)
  @Get('list')
  async getAllEngineer() {
    return await this.engineerService.findAll();
  }

  @Get(':id')
  async getEngieer(@Param('id') id: string) {
    return await this.engineerService.findOne(Number(id));
  }
}
