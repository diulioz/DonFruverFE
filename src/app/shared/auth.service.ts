import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BASE_URL = 'http://localhost:3000';; // Ruta del endpoint en el backend

  constructor(private http: HttpClient) {}

  logearse(idUsuario: string, Contrasena: string){
    return this.http.post<any>(`${this.BASE_URL}/singup`, {idUsuario: idUsuario, Contrasena:Contrasena});
  }
}
