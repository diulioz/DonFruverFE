import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsuarioModel } from './usuario.model';
import { UsuarioService } from './usuario.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuarios: UsuarioModel[]=[];
  BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router, private usuarioService: UsuarioService ) {
    this.obtenerUsuarios()
  }

  //Comunicación con la base de datos para logearse
  logearse(idUsuario: string, Contrasena: string){
    return this.http.post<any>(`${this.BASE_URL}/singup`, {idUsuario: idUsuario, Contrasena:Contrasena});
  }
 
  //Retorno del Token cuando se logra el logeo
  siLogueado(){
    return !!localStorage.getItem('token')
  }

  //Permite cerrar sesión
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('id')
    this.router.navigate(['/donfruver']);
  }
 //pemite obtener la lista de usuarios
  obtenerUsuarios() {
    // Código para obtener los usuarios desde tu servicio
    this.usuarioService.obtenerUsuarios().subscribe((usuarios) => {
      this.usuarios = usuarios; // Asignamos los usuarios a la lista usuarios
    });
  }
  //Permite obtener el rol del usuario que se loguea ("Administrador" o "Cliente")
  obtenerRol(Usuario_ID: string): string {
    const aux = Number(Usuario_ID);
    // Obtener el usuario de manera síncrona usando el operador 'map'
    const usuarioEncontrado = this.usuarios.find(usuario => Number(usuario.idUsuario) === aux);
    const rolEncontrado = usuarioEncontrado ? usuarioEncontrado.Rol : 'No encontrado';
    return rolEncontrado;
  }
  //Validación para saber si quien se loguea es Administrador
  esAdministrador(): boolean {
    const usuarioId = Number(localStorage.getItem('id')).toString();
    try {
      const rol1 = this.obtenerRol(usuarioId);
      const rol2 = 'Administrador';
      if (rol1 && rol1 === rol2) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error al obtener el rol del usuario desde el localStorage:', error);
      return false;
    }
  }
  //Validación para saber si quien se loguea es cliente
  esCliente(): boolean {
    const usuarioId = Number(localStorage.getItem('id')).toString();
    try {
      const rol1 = this.obtenerRol(usuarioId);
      const rol2 = 'Cliente';
      if (rol1 && rol1 === rol2) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error al obtener el rol del usuario desde el localStorage:', error);
      return false;
    }
  }

}
