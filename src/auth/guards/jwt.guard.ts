import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { MACHINE_KEY } from '../decorators/machine.decorator';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const machineKey = this.reflector.getAllAndOverride(MACHINE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const machineKeyFromHeader = context.switchToHttp().getRequest().headers[
      'machine-key'
    ];

    if (machineKey === machineKeyFromHeader) return true;

    return super.canActivate(context);
  }
}
