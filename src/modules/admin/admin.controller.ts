import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthHelper } from 'src/helper/auth.helper';
import { Admin } from './admin.entity';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { AdminGuard } from './guards/admin.guard';

@Controller('admin')
export class AdminController {
  private readonly loginGuard;
  constructor(private readonly adminService: AdminService) {}

  @Get()
  @UseGuards(new AdminGuard(new AuthHelper()))
  async index(): Promise<Admin[]> {
    return await this.adminService.getAllAdmin();
  }

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(new AdminGuard(new AuthHelper()))
  async store(@Body() createAdminDto: CreateAdminDto): Promise<Admin> {
    return await this.adminService.createAdmin(createAdminDto);
  }

  @Get('pagination/:limit/:page')
  @UseGuards(new AdminGuard(new AuthHelper()))
  async getAdminPagination(
    @Param('limit', ParseIntPipe) limit: number,
    @Param('page', ParseIntPipe) currentPage: number,
  ): Promise<object> {
    return this.adminService.getAdminPagination(limit, currentPage);
  }
}
