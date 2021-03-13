import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from '../admin/admin.entity';
import { AdminRepository } from '../admin/admin.repository';
import { UsernameLoginDto } from './dto/admin-login.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepo: AdminRepository,
  ) {}

  async verifyAdmin(usernameLoginDto: UsernameLoginDto): Promise<Object> {
    const admin: Admin = await this.adminRepo.verifyAdmin(usernameLoginDto);
    const token: string = jwt.sign(
      {
        idAdmin: admin.id_admin,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: '7d',
      },
    );
    return {
      username: admin.username,
      address: admin.username,
      avatar: `${process.env.DOMAIN}/admin/${admin.avatar_admin}`,
      typeAdmin: admin.type_admin,
      accessToken: token,
    };
  }
}
