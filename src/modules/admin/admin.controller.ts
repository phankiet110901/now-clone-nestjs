import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadImg } from 'src/helper/upload-img.helper';
import { Admin } from './admin.entity';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { EditAdminDto } from './dto/edit-admin.dto';
import { AdminGuard } from './guards/admin.guard';
import { RootAdminGuard } from './guards/root-adminn.guard';
import { diskStorage } from 'multer';

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
    return await this.adminService.getAdminPagination(limit, currentPage);
  }

  @Put(':idAdmin')
  @UseGuards(RootAdminGuard)
  @UsePipes(ValidationPipe)
  async edit(
    @Body() editAdmin: EditAdminDto,
    @Param('idAdmin') id: string,
  ): Promise<Admin> {
    return await this.adminService.editAdmmin(editAdmin, id);
  }

  @Delete(':idAdmin')
  @UseGuards(RootAdminGuard)
  async delete(@Param('idAdmin') idAdmin: string): Promise<Admin> {
    return await this.adminService.deleteAdmin(idAdmin);
  }

  @Post('upload-img/:idAdmin')
  @UseInterceptors(
    FileInterceptor('avatarAdmin', {
      fileFilter: UploadImg.fileFilters,
      storage: diskStorage({
        destination: './uploads/admin',
        filename: UploadImg.handleUpload,
      }),
    }),
  )
  async uploadFile(
    @UploadedFile() file,
    @Param('idAdmin') idAdmin: string,
  ): Promise<Admin> {
    if (!file) {
      throw new BadRequestException(
        `File can not upload, please sure enable to upload this file`,
      );
    }
    return await this.adminService.insertImg(file.filename, idAdmin);
  }
}
