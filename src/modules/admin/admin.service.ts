import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './admin.entity';
import { AdminRepository } from './admin.repository';
import { CreateAdminDto } from './dto/create-admin.dto';

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
    return this.adminRepo.getAdminPagination(limit, currentPage);
  }
}
