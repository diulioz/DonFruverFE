import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DetalleModel } from '../shared/detalle.model';
import { DetallePedidoService } from '../shared/detalle-pedido.service';
import { ProductoModel } from '../shared/producto.model';

@Component({
  selector: 'app-carro',
  templateUrl: './carro.component.html',
  styleUrls: ['./carro.component.css']
})
export class CarroComponent implements OnInit {
  detalles: Observable<DetalleModel[]> | undefined;
  productos: ProductoModel[] = [];

  constructor(private detalleService: DetallePedidoService) { }

  ngOnInit() {
    this.detalles = this.detalleService.obtenerDetalles();
    this.obtenerProductos();
  }

  obtenerProductos() {
    // Suponiendo que tienes una función en tu DetalleService para obtener los productos
    this.detalleService.obtenerProductos().subscribe((productos) => {
      this.productos = productos;
    });
  }

  obtenerNombreProducto(idProducto: string): string {
    const productoEncontrado = this.productos.find(producto => producto.idProducto === idProducto);
    return productoEncontrado ? productoEncontrado.Nombre : 'Producto no encontrado';
  }

  obtenerPrecioProducto(idProducto: string): number {
    const productoEncontrado = this.productos.find(producto => producto.idProducto === idProducto);
    return productoEncontrado ? productoEncontrado.Precio : 0; // Retorna 0 si no se encuentra el producto
  }

  calcularSubtotal(carro: DetalleModel): void {
    carro.Subtotal = carro.Cantidad * this.obtenerPrecioProducto(carro.Producto_ID);
  }

  incrementarCantidad(detalle: DetalleModel) {
    detalle.Cantidad++;
    this.calcularSubtotal(detalle);
  }

  // Función para decrementar la cantidad del producto en el carro
  decrementarCantidad(detalle: DetalleModel) {
    if (detalle.Cantidad > 1) {
      detalle.Cantidad--;
      this.calcularSubtotal(detalle);
    }
  }

  

  comprar(): void {
    // Lógica para procesar la compra del carro de compras
    console.log('Pedido comprado');
  }

  cancelar(): void {
    // Lógica para cancelar la compra y limpiar el carro de compras
    console.log('Compra cancelada');
  }
  

  eliminarDetalle(idDetalles: string) {
    this.detalleService.borrarDetalle(idDetalles).subscribe(data => {
      console.log("Detalle eliminado");
      this.ngOnInit();
    });
  }
}
