import { AdminGuard } from './admin.guard';

export class RootAdminGuard extends AdminGuard {
  async handleAuth(token: string): Promise<boolean> {
    const id: string = this.helper.verifyToken(token);
    const admin = await this.adminRepo.findOne(id);

    if (!admin || admin.type_admin !== 'root') {
      return false;
    }

    return true;
  }
}
