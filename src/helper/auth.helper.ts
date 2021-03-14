import { BadRequestException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export class AuthHelper {
  verifyToken(token: string): string {
    let payload;
    try {
      payload = jwt.verify(token, process.env.SECRET_KEY);
    } catch {
      throw new BadRequestException('Token invalid !!!!!');
    }
    return payload.id;
  }

  signToken(payload: object): string {
    const token: string = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: '7d',
    });
    return token;
  }
}
