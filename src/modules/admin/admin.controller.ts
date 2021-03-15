import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Admin } from './admin.entity';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { EditAdminDto } from './dto/edit-admin.dto';
import { AdminGuard } from './guards/admin.guard';
import { RootAdminGuard } from './guards/root-adminn.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  @UseGuards(RootAdminGuard)
  async index(): Promise<Admin[]> {
    return await this.adminService.getAllAdmin();
  }

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(AdminGuard)
  async store(@Body() createAdminDto: CreateAdminDto): Promise<Admin> {
    return await this.adminService.createAdmin(createAdminDto);
  }

  @Get('pagination/:limit/:page')
  @UseGuards(AdminGuard)
  async getAdminPagination(
    @Param('limit', ParseIntPipe) limit: number,
    @Param('page', ParseIntPipe) currentPage: number,
  ): Promise<object> {
    return this.adminService.getAdminPagination(limit, currentPage);
  }

  @Post(':keyword/search')
  async search() {}

  @Put(':idAdmin')
  @UseGuards(RootAdminGuard)
  @UsePipes(ValidationPipe)
  async edit(
    @Body() editAdmin: EditAdminDto,
    @Param('idAdmin') id: string,
  ): Promise<Admin> {
    return this.adminService.editAdmmin(editAdmin, id);
  }

  @Delete(':idAdmin')
  @UseGuards(RootAdminGuard)
  async delete(@Param('idAdmin') idAdmin: string): Promise<Admin> {
    return this.adminService.deleteAdmin(idAdmin);
  }
}
