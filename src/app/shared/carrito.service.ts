import { Injectable } from '@angular/core';
import { ProductoModel } from './producto.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private productosCarro: ProductoModel[] = [];

  constructor() { }

  agregarProductoCarro(producto: ProductoModel) {
    this.productosCarro.push(producto);
  }

  obtenerProductosCarro(): ProductoModel[] {
    return this.productosCarro;
  }
}