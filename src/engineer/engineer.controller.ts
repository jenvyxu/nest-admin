import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateEngineerDto } from './dto/create-engineer.dto';
import { UpdateEngineerDto } from './dto/update-engineer.dto';
import { EngineerService } from './engineer.service';
import { Public } from '../auth/decorators/public.decorator';

@Public()
@Controller('engineer')
export class EngineerController {
  constructor(private engineerService: EngineerService) {}
  @Post('add')
  async addEngineer(@Body() engineer: CreateEngineerDto) {
    await this.engineerService.create(engineer);
  }

  @Delete('remove/:id')
  async removeEngineer(@Param('id') id: string) {
    console.log(id);
    await this.engineerService.remove(Number(id));
  }

  @Post('update')
  async updateEngineer(@Body() engineer: UpdateEngineerDto) {
    const { id, ...udpateData } = engineer;
    await this.engineerService.update(id, udpateData);
  }

  @Get('list')
  async getAllEngieer(@Query() query: { size?: string; lastId?: string }) {
    let size: number;
    let lasdId: number;

    if (query.size) {
      try {
        size = parseInt(query.size);
      } catch {
        size = 40;
      }
    }

    if (query.lastId) {
      try {
        lasdId = parseInt(query.lastId);
      } catch {
        lasdId = undefined;
      }
    }

    return await this.engineerService.getList({ size, lasdId });
  }

  @Get('all')
  async getAllEngineer() {
    return await this.engineerService.findAll();
  }

  @Get(':id')
  async getEngieer(@Param('id') id: string) {
    return await this.engineerService.findOne(Number(id));
  }
}
