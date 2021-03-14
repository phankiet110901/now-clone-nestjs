import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AdminGuard implements CanActivate {
  private authHelper;

  constructor(helper) {
    this.authHelper = helper;
  }

  canActivate(context: ExecutionContext): Promise<boolean> | boolean {
    const request = context.switchToHttp().getRequest();

    if (!request.headers.authorization) {
      return false;
    }
    this.handleAuth(request.headers.authorization);
    return true;
  }

  handleAuth(token: string) {
    return this.authHelper.verifyToken(token);
  }
}
