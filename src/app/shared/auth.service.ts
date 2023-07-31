import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BASE_URL = 'http://localhost:3000';; // Ruta del endpoint en el backend

  constructor(private http: HttpClient, private router: Router) {}

  logearse(idUsuario: string, Contrasena: string){
    return this.http.post<any>(`${this.BASE_URL}/singup`, {idUsuario: idUsuario, Contrasena:Contrasena});
  }
 
  siLogueado(){
    return !!localStorage.getItem('token')
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  
} 
