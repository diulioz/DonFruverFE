import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DetalleModel } from './detalle.model';
import { ProductoModel } from './producto.model';
import { PedidoModel } from './pedido.model';


@Injectable({
  providedIn: 'root'
})
export class DetallePedidoService {

  BASE_URL = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  obtenerDetalles() { 
    return this.http.get<DetalleModel[]>(`${this.BASE_URL}/detallesP`);
  }

  obtenerDetalle(idDetalles: string) { 
    return this.http.get<DetalleModel[]>(`${this.BASE_URL}/detallesP/${idDetalles}`);
  }

  agregarDetalle(detalle: DetalleModel) {
    return this.http.post<string>(`${this.BASE_URL}/detallesP`,detalle);
  }
  actualizarDetalle(detalle: DetalleModel) { 
    return this.http.put<string>(`${this.BASE_URL}/detallesP/${detalle.idDetalles}`,detalle);
  }
  borrarDetalle(idDetalles: string) { 
    return this.http.delete<string>(`${this.BASE_URL}/detallesP/${idDetalles}`);
  }

  obtenerProductos() { 
    return this.http.get<ProductoModel[]>(`${this.BASE_URL}/productos`);
  }

  obtenerProducto(idProducto: string) { 
    return this.http.get<ProductoModel[]>(`${this.BASE_URL}/productos/${idProducto}`);
  }

  obtenerPedidos() { 
    return this.http.get<PedidoModel[]>(`${this.BASE_URL}/pedidos`);
  }

  obtenerPedidoId(idPedido: string) { 
    return this.http.get<PedidoModel[]>(`${this.BASE_URL}/pedidos/${idPedido}`);
  }
}
