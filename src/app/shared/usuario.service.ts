import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from './usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  BASE_URL = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  obtenerUsuarios() { 
    return this.http.get<UsuarioModel[]>(`${this.BASE_URL}/usuarios`);
  }

  obtenerUsuario(idUsuario: string) { 
    return this.http.get<UsuarioModel[]>(`${this.BASE_URL}/usuarios/${idUsuario}`);
  }

  agregarUsuario(usuario: UsuarioModel) {
    return this.http.post<string>(`${this.BASE_URL}/usuarios`,usuario);
  }
  actualizarUsuario(usuario: UsuarioModel) { 
    return this.http.put<string>(`${this.BASE_URL}/usuarios/${usuario.idUsuario}`,usuario);
  }
  borrarUsuario(idUsuario: string) { 
    return this.http.delete<string>(`${this.BASE_URL}/usuarios/${idUsuario}`);
  }
}
