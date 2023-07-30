import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { EditarProductosComponent } from './editar-productos/editar-productos.component';

const routes: Routes = [
  {path: 'productos', component: ListaProductosComponent},
  { path: 'productos/editar/:idProducto', component: EditarProductosComponent },
  { path: 'productos/agregar', component: EditarProductosComponent },
  {path:'**',redirectTo:'/productos',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
