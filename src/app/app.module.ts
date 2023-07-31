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
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { EditarProductosComponent } from './editar-productos/editar-productos.component';
import { ListaPedidosComponent } from './lista-pedidos/lista-pedidos.component';
import { LoginComponent } from './login/login.component';
import { DonFruverComponent } from './don-fruver/don-fruver.component';
import { CarroComponent } from './carro/carro.component';
import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    ListaProductosComponent,
    EditarProductosComponent,
    ListaPedidosComponent,
    LoginComponent,
    DonFruverComponent,
    CarroComponent
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
    ProductoService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
