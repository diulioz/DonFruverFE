import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DetalleModel } from '../shared/detalle.model';
import { DetallePedidoService } from '../shared/detalle-pedido.service';
import { ProductoModel } from '../shared/producto.model';
import { PedidoService } from '../shared/pedido.service';
import { PedidoModel } from '../shared/pedido.model';
import { UsuarioService } from '../shared/usuario.service';
import { UsuarioModel } from '../shared/usuario.model';

@Component({
  selector: 'app-carro',
  templateUrl: './carro.component.html',
  styleUrls: ['./carro.component.css']
})
export class CarroComponent implements OnInit {
  detalles: Observable<DetalleModel[]> | undefined;
  productos: ProductoModel[] = [];
  pedidos: PedidoModel[] = [];
  usuarios: UsuarioModel[]=[];
  pedidoConfirmado: Map<string, boolean> = new Map<string, boolean>();
  idUsuario: number = 0;

  constructor(private detalleService: DetallePedidoService, 
    private pedidoService: PedidoService, 
    private usuarioService: UsuarioService) { }

  ngOnInit() {
    const idUsuario = Number(localStorage.getItem('id'));
    this.detalles = this.detalleService.obtenerDetalles();
    this.obtenerProductos();

    // Obtener los pedidos del usuario
    this.pedidoService.obtenerPedidos().subscribe((pedidos) => {
      this.pedidos = pedidos; // Asignamos los pedidos a la lista pedidos
      console.log('Lista de pedidos:', this.pedidos);
      for (const pedido of pedidos) {
        this.pedidoConfirmado.set(pedido.idPedido, pedido.Confirmado === 1 || pedido.Confirmado === 0);
      }
    });
    // this.pedidoService.obtenerPedidos().subscribe((pedidos) => {
    //   this.pedidos = pedidos; // Asignamos los pedidos a la lista pedidos
    //   console.log('Lista de pedidos:', this.pedidos);
    //   for (const pedido of pedidos) {
    //     this.pedidoConfirmado.set(pedido.idPedido, pedido.Usuario_ID === idUsuario);
    //   }
    // });
    this.usuarioService.obtenerUsuarios().subscribe((usr) => {
      this.usuarios = usr; // Asignamos los usr a la lista usr
      // console.log('Lista de usr:', this.usuarios);
      // for (const pedido of usr) {
      //   this.pedidoConfirmado.set(pedido.idPedido, pedido.Usuario_ID === idUsuario);
      // }
    });
  }

  obtenerProductos() {
    this.detalleService.obtenerProductos().subscribe((productos) => {
      this.productos = productos;
    });
  }

  // obtenerPedidos() {
  //   this.pedidoService.obtenerPedidos().subscribe((pedidos) => {
  //     this.pedidos = pedidos;
  //   });
  // }

  obtenerNombreProducto(idProducto: string): string {
    const productoEncontrado = this.productos.find(producto => producto.idProducto === idProducto);
    return productoEncontrado ? productoEncontrado.Nombre : 'Producto no encontrado';
  }

  
  obtenerPrecioProducto(idProducto: string): number {
    const productoEncontrado = this.productos.find(producto => producto.idProducto === idProducto);
    return productoEncontrado ? productoEncontrado.Precio : 0; // Retorna 0 si no se encuentra el producto
  }

  obtenerUPedido(idPedido: string): string {
    const pedidoEncontrado = this.pedidos.find(pedido => pedido.idPedido === idPedido);
    return pedidoEncontrado ? pedidoEncontrado.Usuario_ID.toString() : 'UN';
  }

  obtenerNombre(Usuario_ID: string): string {
    console.log('Contenido del arreglo usuarios:', this.usuarios);
    const pedidoEncontrado = this.usuarios.find(usuario => usuario.idUsuario === Usuario_ID);
    console.log('Resultado de la función obtenerNombre:', pedidoEncontrado);
    return pedidoEncontrado ? pedidoEncontrado.Nombre : 'UN';
  }

  obtenerNombreUsuario(idPedido: string): string {
    const idPed = this.obtenerUPedido(idPedido);
    console.log(idPed)
    const nombre = this.obtenerNombre(idPed);
    console.log(nombre)
    return this.obtenerNombre(idPed);
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

  actualizarDetalle(detalle: DetalleModel) {
    this.detalleService.actualizarDetalle(detalle).subscribe(data => {
      console.log("Detalle Actualizado");
      this.ngOnInit();
    });
  }
}
