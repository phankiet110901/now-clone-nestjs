import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from '../admin/admin.entity';
import { AdminRepository } from '../admin/admin.repository';
import { UsernameLoginDto } from './dto/admin-login.dto';
import * as jwt from 'jsonwebtoken';
import { AuthHelper } from 'src/helper/auth.helper';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepo: AdminRepository,
    private readonly authHelper: AuthHelper,
  ) {}

  async verifyAdmin(usernameLoginDto: UsernameLoginDto): Promise<Object> {
    const admin: Admin = await this.adminRepo.verifyAdmin(usernameLoginDto);
    const token: string = this.authHelper.signToken({ id: admin.id_admin });
    return {
      username: admin.username,
      address: admin.username,
      avatar: `${process.env.DOMAIN}/admin/${admin.avatar_admin}`,
      typeAdmin: admin.type_admin,
      accessToken: token,
    };
  }
}
