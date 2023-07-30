import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductoModel } from './producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  BASE_URL = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  obtenerProductos() { 
    return this.http.get<ProductoModel[]>(`${this.BASE_URL}/productos`);
  }

  obtenerProducto(idProducto: string) { 
    return this.http.get<ProductoModel[]>(`${this.BASE_URL}/productos/${idProducto}`);
  }

  agregarProducto(producto: ProductoModel) {
    return this.http.post<string>(`${this.BASE_URL}/productos`,producto);
  }
  actualizarProducto(producto: ProductoModel) { 
    return this.http.put<string>(`${this.BASE_URL}/productos/${producto.idProducto}`,producto);
  }
  borrarProducto(idProducto: string) { 
    return this.http.delete<string>(`${this.BASE_URL}/productos/${idProducto}`);
  }

}