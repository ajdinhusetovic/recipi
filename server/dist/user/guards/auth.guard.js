"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
class AuthGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        if (request.user) {
            return true;
        }
        throw new common_1.HttpException('Not authorized', common_1.HttpStatus.UNAUTHORIZED);
    }
}
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map