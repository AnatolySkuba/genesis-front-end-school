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
  async getCourses() {
    return this.appService.getCourses();
  }

  @Get('core/preview-courses/:id')
  async getCourseById(@Param('id') id: string) {
    return this.appService.getCourseById(id);
  }
}

@Controller('api/v2')
export class AppController2 {
  constructor(private readonly appService: AppService) {}

  @Get('auth/anonymous')
  async getToken() {
    return this.appService.getToken();
  }

  @Get('core/preview-courses')
  async getCoursesV2(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
  ) {
    return this.appService.getCoursesV2(page, perPage);
  }

  @Get('core/preview-courses/:id')
  async getCourseById(@Param('id') id: string) {
    return this.appService.getCourseById(id);
  }
}
