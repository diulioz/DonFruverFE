import { Component } from '@angular/core';
import { ProductoModel } from '../shared/producto.model';
import { Observable } from 'rxjs';
import { ProductoService } from '../shared/producto.service';
import { CarritoService } from '../shared/carrito.service';


@Component({
  selector: 'app-don-fruver',
  templateUrl: './don-fruver.component.html',
  styleUrls: ['./don-fruver.component.css']
})
export class DonFruverComponent {
  productos: Observable<ProductoModel[]> | undefined;
  showModal = false; // Variable para mostrar/ocultar el modal
  productoSeleccionado: ProductoModel | undefined;

  constructor(
    private productoService: ProductoService,
    private carritoService: CarritoService
  ) {}

  ngOnInit() {
    this.productos = this.productoService.obtenerProductos();
  }

  agregarAlCarrito(producto: ProductoModel) {
    this.carritoService.agregarAlCarrito(producto);
    console.log('Producto agregado al carrito:', producto);
  }

  abrirModal(producto: ProductoModel) {
    this.productoSeleccionado = producto;
    this.showModal = true;
  }

  cerrarModal() {
    this.showModal = false;
  }
}
