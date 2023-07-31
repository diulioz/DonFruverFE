import { Injectable } from '@angular/core';
import { ProductoModel } from './producto.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  carrito: ProductoModel[] = [];

  agregarAlCarrito(producto: ProductoModel) {
    this.carrito.push(producto);
  }

  obtenerCarrito() {
    return this.carrito;
  }

  vaciarCarrito() {
    this.carrito = [];
  }
}