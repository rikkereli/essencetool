import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import * as routes from "../../assets/routes";

@Injectable({
  providedIn: 'root'
})
export class LoggedinGuard implements CanActivate {

  constructor(    
    public authService: AuthServiceService,
    public router: Router
    ) {

  }
  // If we are logged in, we should not be able to access the login page
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(this.authService.isLoggedIn == true) {
        this.router.navigate([routes.dashboard]);
      }
      return true;
  }
  
}
