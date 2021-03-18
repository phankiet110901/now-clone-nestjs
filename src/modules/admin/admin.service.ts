import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './admin.entity';
import { AdminRepository } from './admin.repository';
import { CreateAdminDto } from './dto/create-admin.dto';
import { EditAdminDto } from './dto/edit-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepo: AdminRepository,
  ) {}

  async getAllAdmin(): Promise<Admin[]> {
    return await this.adminRepo.getAllAdmin();
  }

  async createAdmin(createAdminDto: CreateAdminDto): Promise<Admin> {
    return await this.adminRepo.createAdmin(createAdminDto);
  }

  async getAdminPagination(limit: number, currentPage: number): Promise<object> {
    return await this.adminRepo.getAdminPagination(limit, currentPage);
  }

  async editAdmmin(editAdminDto: EditAdminDto, id: string): Promise<Admin> {
    return await this.adminRepo.editAdmin(editAdminDto, id);
  }

  async deleteAdmin(idAdmin: string): Promise<Admin> {
    return await this.adminRepo.deleteAdmin(idAdmin);
  }

  async insertImg(fileName: string, idAdmin: string) {
    return await this.adminRepo.insertImg(fileName, idAdmin);
  }
}
