import { Component } from '@angular/core';
import { PedidoModel } from '../shared/pedido.model';
import { Observable } from 'rxjs';
import { PedidoService } from '../shared/pedido.service';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.css']
})
export class ListaPedidosComponent {
  pedidos: Observable<PedidoModel[]> | undefined;

  constructor(private pedidosService: PedidoService) { }

  ngOnInit(){
    this.pedidos = this.pedidosService.obtenerPedidos();
  }

  borrarPedido(idPedido: string) { 
    this.pedidosService.borrarPedido(idPedido).subscribe(data => { 
      console.log("Registro Eliminado");
      this.ngOnInit();
    });
  }
  confirmarPedido(pedido: PedidoModel): void {
    pedido.Confirmado = 1; // Establecer el estado a "Aceptado" (valor 1)
    this.pedidosService.confirmarPedido(pedido).subscribe(data => {
      console.log("Pedido confirmado");
      this.ngOnInit(); // Otra opción es actualizar solo el pedido modificado en la lista de pedidos actual
    });
  }
  
  rechazarPedido(pedido: PedidoModel): void {
    pedido.Confirmado = 0; // Establecer el estado a "Rechazado" (valor 0)
    this.pedidosService.rechazarPedido(pedido).subscribe(data => {
      console.log("Pedido rechazado");
      this.ngOnInit(); // Otra opción es actualizar solo el pedido modificado en la lista de pedidos actual
    });
  }
  

}
