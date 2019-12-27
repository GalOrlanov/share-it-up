import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService:AuthService, private router:Router){}
   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
       if(this.authService.isAuth()){
           return true;
       }
       else{
           this.router.navigateByUrl('/login');
           return false;
       }
  }

}