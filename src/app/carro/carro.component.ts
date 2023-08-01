import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DetalleModel } from '../shared/detalle.model';
import { DetallePedidoService } from '../shared/detalle-pedido.service';
import { ProductoModel } from '../shared/producto.model';
import { PedidoService } from '../shared/pedido.service';
import { PedidoModel } from '../shared/pedido.model';

@Component({
  selector: 'app-carro',
  templateUrl: './carro.component.html',
  styleUrls: ['./carro.component.css']
})
export class CarroComponent implements OnInit {
  detalles: Observable<DetalleModel[]> | undefined;
  productos: ProductoModel[] = [];
  pedido: PedidoModel[] = [];
  pedidoConfirmado: Map<string, boolean> = new Map<string, boolean>();

  constructor(private detalleService: DetallePedidoService, private pedidoService: PedidoService) { }

  ngOnInit() {
    const idUsuario = Number(localStorage.getItem('id'));
    this.detalles = this.detalleService.obtenerDetalles();
    this.obtenerProductos();

    // Obtener los pedidos del usuario
    this.pedidoService.obtenerPedidos().subscribe((pedidos) => {
      for (const pedido of pedidos) {
        this.pedidoConfirmado.set(pedido.idPedido, pedido.Confirmado === 1);
      }
    });
  }

  obtenerProductos() {
    this.detalleService.obtenerProductos().subscribe((productos) => {
      this.productos = productos;
    });
  }

  obtenerPedidos() {
    this.pedidoService.obtenerPedidos().subscribe((pedido) => {
      this.pedido = pedido;
      this.pedido.forEach(p => console.log('Usuario_ID:', p.Usuario_ID));
    });
  }

  obtenerPedidosU(idUsuario: number): string {
    const pedidoEncontrado = this.pedido.find(pedidoU => pedidoU.Usuario_ID === idUsuario);
    return pedidoEncontrado ? pedidoEncontrado.idPedido : 'Pedido no encontrado';
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

  eliminarDetalle(idDetalles: string) {
    this.detalleService.borrarDetalle(idDetalles).subscribe(data => {
      console.log("Detalle eliminado");
      this.ngOnInit();
    });
  }

  actualizarDetalle(idDetalles: DetalleModel) {
    this.detalleService.actualizarDetalle(idDetalles).subscribe(data => {
      console.log("Detalle Actualizado");
      this.ngOnInit();
    });
  }
}
