import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  SetMetadata,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { AuthService } from "src/services";
import { ModifiedRequest } from "src/types";

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

    const request = context.switchToHttp().getRequest<ModifiedRequest>();
    const authHeader = request.headers.authorization;
    if (!authHeader) return false;
    const accessToken = authHeader.split(" ")[1];
    if (!accessToken) return false;
    const tokenInfo = this.authService.validateAccessToken(accessToken);
    if (tokenInfo) {
      request.userInfo = tokenInfo;
    }

    return !!tokenInfo;
  }
}

export const Public = () => SetMetadata(PUBLIC_REQUEST_METADATA_NAME, true);
