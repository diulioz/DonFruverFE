import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { DetallePedidoService } from './shared/detalle-pedido.service';
import { PedidoService } from './shared/pedido.service';
import { UsuarioService } from './shared/usuario.service';
import { ProductoService } from './shared/producto.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule

  ],
  providers: [
    DetallePedidoService,
    PedidoService,
    UsuarioService,
    ProductoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
