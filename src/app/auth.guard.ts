import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}
  // para restringir la entrada a las vidatas si no se esta logueado y con los permisos necesarios
  canActivate():boolean{
    if(this.authService.siLogueado()){
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  } 
  
}
