import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { Role } from '../roles.enum';

export interface JwtUser {
  id: string;
  idNumber: string;
  name: string;
  username: string;
  role: Role;
  status: boolean;
}

export const CurrentUser = createParamDecorator(
  (data: keyof JwtUser | undefined, ctx: ExecutionContext) => {
    const req: Request & { user?: JwtUser } = ctx.switchToHttp().getRequest();
    return data ? req.user?.[data] : req.user;
  },
);
