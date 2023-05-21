import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api/v1')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('auth/anonymous')
  async getToken() {
    return this.appService.getToken();
  }

  @Get('core/preview-courses')
  async getCourses(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
  ) {
    return this.appService.getCourses(page, perPage);
  }

  @Get('core/preview-courses/:id')
  async getCourse(@Param('id') id: string) {
    return this.appService.getCourse(id);
  }
}
