import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioModel } from './usuario.model';
import { PedidoModel } from './pedido.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) {}

  logearse(idUsuario: string, Contrasena: string){
    return this.http.post<any>(`${this.BASE_URL}/singup`, {idUsuario: idUsuario, Contrasena:Contrasena});
  }

  obtenerRolUsuario(idUsuario: String): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/usuarioRol/${idUsuario}`);
  }

  obtenerUsuarioId(idUsuario: string): Observable<UsuarioModel[]> {
    return this.http.get<UsuarioModel[]>(`${this.BASE_URL}/usuarios/${idUsuario}`);
  }

  obtenerDetallesPedidoPorId(idPedido: number): Observable<PedidoModel[]> {
    return this.http.get<PedidoModel[]>(`${this.BASE_URL}/pedidos/${idPedido}`);
  }
 
  siLogueado(){
    return !!localStorage.getItem('token')
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  esAdministrador(): boolean {
    try {
      const rol = localStorage.getItem('rol');
      return rol === 'Administrador';
    } catch (error) {
      console.error('Error al obtener el rol del usuario desde el localStorage:', error);
      return false;
    }
  }
  
  obtenerRol(idUsuario: string): void {
    this.obtenerUsuarioId(idUsuario).subscribe(usuarios => {
      if (usuarios.length > 0) {
        const rolUsuario = usuarios[0].Rol;
        console.log('Rol obtenido:', rolUsuario);
        localStorage.setItem('rol', rolUsuario);
      } 
    });
  }



}
