import { Component } from '@angular/core';
import { ProductoModel } from '../shared/producto.model';
import { Observable } from 'rxjs';
import { ProductoService } from '../shared/producto.service';
import { PedidoModel } from '../shared/pedido.model';
import { DetalleModel } from '../shared/detalle.model';
import { PedidoService } from '../shared/pedido.service';
import { DetallePedidoService } from '../shared/detalle-pedido.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-don-fruver',
  templateUrl: './don-fruver.component.html',
  styleUrls: ['./don-fruver.component.css']
})
export class DonFruverComponent {
  productos: Observable<ProductoModel[]> | undefined;
  showModal = false; // Variable para mostrar/ocultar el modal
  productoSeleccionado: ProductoModel | undefined;
  pedidoNuevo: PedidoModel | undefined;
  productosFiltrados: ProductoModel[] = []; // Agregar lista para almacenar productos filtrados
  filtro: any = {}; // Objeto para almacenar los criterios de filtrado

  // detallesPedido: DetalleModel[] = [];
  // cantidadProductos: number = 0;
  
  constructor(
    private productoService: ProductoService,
    private pedidoService: PedidoService,
    private detallePedidoService: DetallePedidoService
  ) {}

  // Se obtiene los productos almacenados en la BD
  ngOnInit() {
    this.obtenerProductos();
  }

  // Se obtiene los productos y permite aplicar el filtro
  obtenerProductos() {
    this.productos = this.productoService.obtenerProductos();
    this.productos?.subscribe((productos) => {
      this.productosFiltrados = productos; // Actualizar lista de productos filtrados al obtener los productos
      this.filtrarProductos(); // Aplicar el filtrado inicial
    });
  }

  filtrarProductos() {
    // Filtrar productos en base a los criterios ingresados por el usuario puede ser por nombre, categoria o precio
    if (this.filtro.nombre || this.filtro.categoria || this.filtro.precio) {
      this.productosFiltrados = this.productosFiltrados.filter((producto) => {
        const nombre = this.filtro.nombre
          ? producto.Nombre.toLowerCase().includes(this.filtro.nombre.toLowerCase())
          : true;
        const categoria = this.filtro.categoria
          ? producto.Categoria.toLowerCase().includes(this.filtro.categoria.toLowerCase())
          : true;
        const precio = this.filtro.precio ? producto.Precio <= this.filtro.precio : true;
        return nombre && categoria && precio;
      });
    } else {
      // Si no hay criterios de filtrado, mostrar todos los productos
      this.productos?.subscribe((productos) => {
        this.productosFiltrados = productos;
      });
    }
  }

  limpiarFiltro() {
    // Limpiar el objeto de filtro y mostrar todos los productos
    this.filtro = {};
    this.productos?.subscribe((productos) => {
      this.productosFiltrados = productos;
    });
  }
  //VENTANA EMERGENTE CON INFORMACION DEL PRODUCTO
  //permite abrir la ventana emergente con la informacion extendida del producto
  abrirModal(producto: ProductoModel) {
    this.productoSeleccionado = producto;
    this.showModal = true;
  }
  //permite cerrar la ventana Modal
  cerrarModal() {
    this.showModal = false;
  }

  //Permite hacer la compra de un producto
  comprarProducto(producto: ProductoModel) {
    const idUsuario = Number(localStorage.getItem('id')); // Obtener el idUsuario del localStorage
    // Obtener la cantidad de productos antes de comprar
    this.obtenerCantidad(producto.idProducto).subscribe(cantidadAntes => {
      console.log('Cantidad antes de comprar:', cantidadAntes);
      // Crear un nuevo pedido
      this.pedidoNuevo = new PedidoModel('', idUsuario, new Date(), 2, 3);
      // Agregar el nuevo pedido al servicio de pedidos
      this.pedidoService.agregarPedido(this.pedidoNuevo).subscribe((pedidoCreado) => {
        // Pedido creado con éxito, ahora guardamos el detalle de pedido asociado
        if (pedidoCreado && pedidoCreado.idPedido) {
          const detallePedido: DetalleModel = {
            idDetalles: '0', // Convertimos a string el ID del detalle ya que el backend lo espera así
            Pedido_ID: pedidoCreado.idPedido,
            Producto_ID: producto.idProducto, // Utilizamos el idProducto del producto seleccionado
            Cantidad: producto.Cantidad_Disponible,
            Subtotal: producto.Cantidad_Disponible * producto.Precio,
          };
          // Se actualiza el total del pedido
          this.confirmarPedido(pedidoCreado, detallePedido.Subtotal);
          // Se actualiza la cantidad del producto en la base de datos
          this.actualizarProducto(producto, cantidadAntes, detallePedido.Cantidad);
          this.detallePedidoService.agregarDetalle(detallePedido).subscribe((detalleCreado) => {
            console.log('Compra realizada con éxito');
          });
        } else {
          console.log('Error al crear el pedido');
        }
      });
    });
  }
  //permite obtener la cantidad de un producto
  obtenerCantidad(producto: string): Observable<number> {
    return this.productoService.obtenerProducto(producto).pipe(
      map(data => {
        if (data.length > 0) {
          return data[0].Cantidad_Disponible;
        } else {
          console.log("Producto no encontrado");
          return 0;
        }
      })
    );
  }
  //permite actualizar el total en la base de datos
  confirmarPedido(pedido: PedidoModel, total:number): void {
    pedido.Total = total;
    this.pedidoService.confirmarPedido(pedido).subscribe(data => {
      console.log("Pedido actualizado");
      this.ngOnInit();
      
    });
  }
  // permite actualizar la cantidad de un producto en la base de datos
  actualizarProducto(producto: ProductoModel, cantidad1: number, cantidad2: number): void {
    if (cantidad1 >= cantidad2) {
      producto.Cantidad_Disponible = cantidad1-cantidad2;
      console.log(producto.Cantidad_Disponible)
      this.productoService.actualizarProducto(producto).subscribe(data => {
        console.log("Producto actualizado");
        this.ngOnInit();
      });
    } else {
      console.log("Cantidad insuficiente de producto");
    }
  }
}
