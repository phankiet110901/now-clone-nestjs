import { EntityRepository, Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { v4 as uuidv4 } from 'uuid';
import { UsernameLoginDto } from '../auth/dto/admin-login.dto';
import { BadRequestException } from '@nestjs/common';

@EntityRepository(Admin)
export class AdminRepository extends Repository<Admin> {
  async getAllAdmin(): Promise<Admin[]> {
    const allAdmin = await this.find({
      where: { type_admin: 'normal' },
    });

    return allAdmin.map((admin) => this.handleReponse(admin));
  }

  async createAdmin(createAdminDto: CreateAdminDto): Promise<Admin> {
    const newAdmin = new Admin();
    newAdmin.id_admin = uuidv4();
    newAdmin.username = createAdminDto.username;
    newAdmin.password = createAdminDto.password;
    newAdmin.phone = createAdminDto.phone;
    newAdmin.type_admin = createAdminDto.typeAdmin;
    newAdmin.addresss = createAdminDto.address;
    await newAdmin.save();

    return this.handleReponse(newAdmin);
  }

  async verifyAdmin(dataLogin: UsernameLoginDto): Promise<Admin> {
    const foundAdmin: Admin = await this.findOne({
      where: { username: dataLogin.username },
    });

    if (!foundAdmin) {
      throw new BadRequestException(
        `Can not find admin '${dataLogin.username}' `,
      );
    }

    return foundAdmin;
  }

  private handleReponse(admin): Admin {
    delete admin.type_admin;
    delete admin.password;
    return admin;
  }
}
