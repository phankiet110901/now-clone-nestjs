import { EntityRepository, Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { v4 as uuidv4 } from 'uuid';
import { UsernameLoginDto } from '../auth/dto/admin-login.dto';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { TypeAdmin } from './enum/type-admin.enum';
import { EditAdminDto } from './dto/edit-admin.dto';

@EntityRepository(Admin)
export class AdminRepository extends Repository<Admin> {
  async getAllAdmin(): Promise<Admin[]> {
    const allAdmin = await this.find({
      where: { type_admin: TypeAdmin.normal },
    });

    return allAdmin.map((admin) => this.handleReponse(admin));
  }

  async createAdmin(createAdminDto: CreateAdminDto): Promise<Admin> {
    const foundAdmin = await this.findOne({
      username: createAdminDto.username,
    });

    if (foundAdmin) {
      throw new BadRequestException(
        `Username '${createAdminDto.username}' have already exist !!!`,
      );
    }

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

    const isComparePassword = await bcrypt.compare(
      dataLogin.password,
      foundAdmin.password,
    );

    if (!isComparePassword) {
      throw new BadRequestException('Wrong password !!!');
    }

    return foundAdmin;
  }

  async getAdminPagination(
    limit: number,
    currentPage: number = 0,
  ): Promise<object> {
    if (currentPage < 0) {
      throw new BadRequestException('Page must be more than 0 !!!');
    }

    const skip: number = (currentPage - 1) * limit;
    const [items, count] = await this.findAndCount({
      where: { type_admin: TypeAdmin.normal },
      skip,
      take: limit,
    });

    return {
      currentPage,
      limit,
      totalPage: Math.ceil(count / limit),
      items: items.map((admin) => this.handleReponse(admin)),
    };
  }

  async editAdmin(editAdmin: EditAdminDto, id: string) {
    const foundAdmin: Admin = await this.findOne(id);
    if (!foundAdmin) {
      throw new BadRequestException(`Can not find admin '${id}' `);
    }

    foundAdmin.password = await bcrypt.hash(
      editAdmin.password,
      +process.env.BCRYPT_SALT,
    );
    foundAdmin.addresss = editAdmin.address;
    foundAdmin.phone = editAdmin.phone;

    await foundAdmin.save();
    return this.handleReponse(foundAdmin);
  }

  async deleteAdmin(idAdmin: string): Promise<Admin> {
    const foundAdmin: Admin = await this.findOne(idAdmin);

    if(!foundAdmin) {
      throw new BadRequestException(`Can not find admin id '${idAdmin}' `);
    }

    await this.remove(foundAdmin);
    return this.handleReponse(foundAdmin);
  }

  private handleReponse(admin): Admin {
    delete admin.type_admin;
    delete admin.password;
    return admin;
  }
}
