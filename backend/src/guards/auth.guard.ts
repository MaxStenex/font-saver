import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  SetMetadata,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { Observable } from "rxjs";
import { AuthService } from "src/services";

const PUBLIC_REQUEST_METADATA_NAME = "isPublic";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(AuthService) private authService: AuthService,
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requestIsPublic = this.reflector.get<boolean>(
      PUBLIC_REQUEST_METADATA_NAME,
      context.getHandler(),
    );
    if (requestIsPublic) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;
    if (!authHeader) return false;
    const accessToken = authHeader.split(" ")[1];
    if (!accessToken) return false;
    const tokenIsValid = this.authService.validateAccessToken(accessToken);

    return tokenIsValid;
  }
}

export const Public = () => SetMetadata(PUBLIC_REQUEST_METADATA_NAME, true);
