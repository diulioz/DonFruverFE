import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { EditarProductosComponent } from './editar-productos/editar-productos.component';
import { ListaPedidosComponent } from './lista-pedidos/lista-pedidos.component';
import { CarroComponent } from './carro/carro.component';
import { DonFruverComponent } from './don-fruver/don-fruver.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path: 'productos', component: ListaProductosComponent, canActivate:[AuthGuard]},
  { path: 'productos/editar/:idProducto', component: EditarProductosComponent, canActivate:[AuthGuard] },
  { path: 'productos/agregar', component: EditarProductosComponent, canActivate:[AuthGuard] },
  { path: 'pedidos', component: ListaPedidosComponent, canActivate:[AuthGuard] },
  { path: 'carro', component: CarroComponent, canActivate:[AuthGuard] },
  { path: 'donfruver', component: DonFruverComponent },
  { path: 'login', component: LoginComponent },
  {path:'**',redirectTo:'donfruver',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
