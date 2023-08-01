import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PedidoModel } from './pedido.model';
import { UsuarioModel } from './usuario.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  

  BASE_URL = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  obtenerPedidos() { 
    return this.http.get<PedidoModel[]>(`${this.BASE_URL}/pedidos`);
  }

  obtenerPedido(idPedido: string) { 
    return this.http.get<PedidoModel[]>(`${this.BASE_URL}/pedidos/${idPedido}`);
  }

  agregarPedido(pedido: PedidoModel): Observable<PedidoModel> {
    return this.http.post<PedidoModel>(`${this.BASE_URL}/pedidos`, pedido);
  }
  
  confirmarPedido(pedido: PedidoModel) { 
    return this.http.put<string>(`${this.BASE_URL}/pedidos/${pedido.idPedido}`,pedido);
  }
  borrarPedido(idPedido: string) { 
    return this.http.delete<string>(`${this.BASE_URL}/pedidos/${idPedido}`);
  }

  obtenerCorreoElectronicoUsuario(idUsuario: number): Observable<UsuarioModel[]> {
    return this.http.get<UsuarioModel[]>(`${this.BASE_URL}/usuarios/${idUsuario}`);
  }

  obtenerPedidosUsuario(idUsuario: string) { 
    return this.http.get<UsuarioModel[]>(`${this.BASE_URL}/usuarios/${idUsuario}`);
  }
  
}
