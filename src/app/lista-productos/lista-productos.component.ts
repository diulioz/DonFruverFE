import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductoModel } from '../shared/producto.model';
import { ProductoService } from '../shared/producto.service';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {
  productos: Observable<ProductoModel[]> | undefined;

  constructor(private productoService: ProductoService) { }

  ngOnInit(){
    this.productos = this.productoService.obtenerProductos();
  }

  borrarProducto(idProducto: string) { 
    this.productoService.borrarProducto(idProducto).subscribe(data => { 
      console.log("Registro Eliminado");
      this.ngOnInit();
    });
  }

}