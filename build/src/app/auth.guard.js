import * as tslib_1 from "tslib";
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
let AuthGuard = class AuthGuard {
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    canActivate(route, state) {
        if (this.authService.isAuth()) {
            return true;
        }
        else {
            this.router.navigateByUrl('/login');
            return false;
        }
    }
};
AuthGuard = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [AuthService, Router])
], AuthGuard);
export { AuthGuard };
//# sourceMappingURL=auth.guard.js.map