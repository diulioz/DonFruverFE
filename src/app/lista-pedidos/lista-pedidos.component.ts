import { Component } from '@angular/core';
import { PedidoModel } from '../shared/pedido.model';
import { Observable } from 'rxjs';
import { PedidoService } from '../shared/pedido.service';
import { UsuarioModel } from '../shared/usuario.model';
import { CorreoService } from '../shared/correo.service';


@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.css']
})
export class ListaPedidosComponent {
  pedidos: Observable<PedidoModel[]> | undefined;
  correoElectronico: string | undefined;
  // correoService: any;

  constructor(
    private pedidosService: PedidoService,
    private correoService: CorreoService
  ) { }

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
    this.obtenerCorreoElectronico(pedido.Usuario_ID);
    this.pedidosService.confirmarPedido(pedido).subscribe(data => {
      console.log("Pedido confirmado");
      this.ngOnInit();
      this.correoService.enviarCorreo(this.correoElectronico || '', 'Pedido Confirmado', 'Tu pedido ha sido confirmado con éxito. Gracias por tu compra.').subscribe(
        (response) => {
          console.log('Correo enviado con éxito', response);
        },
        (error) => {
          console.error('Error al enviar el correo', error);
        }
      );
    });
  }
  
  rechazarPedido(pedido: PedidoModel): void {
    pedido.Confirmado = 0; // Establecer el estado a "Rechazado" (valor 0)
    this.obtenerCorreoElectronico(pedido.Usuario_ID);
    this.pedidosService.confirmarPedido(pedido).subscribe(data => {
      console.log("Pedido rechazado");
      this.ngOnInit();
      this.correoService.enviarCorreo(this.correoElectronico || '', 'Pedido Rechazado', 'Lamentamos informarte que tu pedido ha sido rechazado. Por favor, contáctanos para más información.').subscribe(
        (response) => {
          console.log('Correo enviado con éxito', response);
        },
        (error) => {
          console.error('Error al enviar el correo', error);
        }
      );
    });
  }

  
  obtenerCorreoElectronico(idUsuario: number): void {
    this.pedidosService.obtenerCorreoElectronicoUsuario(idUsuario).subscribe(usuarios => {
      if (usuarios.length > 0) {
        this.correoElectronico = usuarios[0].Email;
        console.log('Correo electrónico obtenido:', this.correoElectronico);
      } else {
        this.correoElectronico = '';
      }
    });
  }
}
