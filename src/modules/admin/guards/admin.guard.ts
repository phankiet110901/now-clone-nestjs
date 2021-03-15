import { CanActivate, ExecutionContext } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthHelper } from 'src/helper/auth.helper';
import { AdminRepository } from '../admin.repository';

export class AdminGuard implements CanActivate {
  constructor(
    @InjectRepository(AdminRepository)
    readonly adminRepo: AdminRepository,
    readonly helper: AuthHelper,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.headers.authorization) {
      return false;
    }

    return await this.handleAuth(request.headers.authorization);
  }

  async handleAuth(token: string): Promise<boolean> {
    const id: string = this.helper.verifyToken(token);
    const admin = await this.adminRepo.findOne(id);

    if (!admin) {
      return false;
    }

    return true;
  }
}
