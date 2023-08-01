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

  constructor(private detalleService: DetallePedidoService, 
    private pedidoService: PedidoService, 
    private usuarioService: UsuarioService) { }

  ngOnInit() {
    const idUsuario = localStorage.getItem('id');
    this.detalles = this.detalleService.obtenerDetalles();
    this.obtenerProductos();
    const prueba = this.esUsuario(idUsuario)
    console.log(prueba)
    // Obtener los pedidos del usuario
    this.pedidoService.obtenerPedidos().subscribe((pedidos) => {
      this.pedidos = pedidos; // Asignamos los pedidos a la lista pedidos
      // const prueba = this.esUsuario()
    console.log(prueba)
      console.log('Lista de pedidos:', this.pedidos);
      for (const pedido of pedidos) {
        const id = pedido.Usuario_ID
        // const prueba = this.esUsuario(pedido.Usuario_ID)
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
  //FUNCIONES PARA OBTENER DATOS DE LOS PRODUCTOS
  //se obtiene la totalidad de los productos
  obtenerProductos() {
    this.detalleService.obtenerProductos().subscribe((productos) => {
      this.productos = productos;
    });
  }
  //se obtiene el nombre del producto usande el idProducto
  obtenerNombreProducto(idProducto: string): string {
    const productoEncontrado = this.productos.find(producto => producto.idProducto === idProducto);
    return productoEncontrado ? productoEncontrado.Nombre : 'Producto no encontrado';
  }
  //Se obtiene el precio del producto usando el idProducto
  obtenerPrecioProducto(idProducto: string): number {
    const productoEncontrado = this.productos.find(producto => producto.idProducto === idProducto);
    return productoEncontrado ? productoEncontrado.Precio : 0; // Retorna 0 si no se encuentra el producto
  }

  //Permite que en el carrito solo se muestren los pedidos del usuario en sesión
  esUsuario(idUsuario: string|null){
    const usuario1 = Number(localStorage.getItem('id'));
    const usuario2 = Number(idUsuario)
    if(usuario1==usuario2){
      return true;
    }
    else{
      return false;
    }
  }
  //Permite obtener el Usuario_ID en pedido, usando el idPedido
  obtenerUPedido(idPedido: string): string {
    const pedidoEncontrado = this.pedidos.find(pedido => pedido.idPedido === idPedido);
    return pedidoEncontrado ? pedidoEncontrado.Usuario_ID.toString() : 'No encontrado';
  }
  //Permite obtener el Nombre del Usuario 
  obtenerNombre(Usuario_ID: string): string {
    const aux = Number(Usuario_ID)
    const pedidoEncontrado = this.usuarios.find(usuario => Number(usuario.idUsuario) == aux);
    return pedidoEncontrado ? pedidoEncontrado.Nombre : 'No encontrado';
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
