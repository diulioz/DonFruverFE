import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../shared/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoModel } from '../shared/producto.model';

@Component({
  selector: 'app-editar-productos',
  templateUrl: './editar-productos.component.html',
  styleUrls: ['./editar-productos.component.css']
})
export class EditarProductosComponent implements OnInit{  

  idProducto = '';
  producto = new ProductoModel("", "", "",0, 0, "");

  constructor(private productoService: ProductoService,private route: ActivatedRoute, private router: Router) { }

    
  ngOnInit() {
    this.idProducto = this.route.snapshot.params['idProducto'];
    console.log("El id de Producto es :" + this.idProducto);
    
    if (this.idProducto) { 
      //Editar
      this.productoService.obtenerProducto(this.idProducto).subscribe(data => {
        this.producto = data[0];
      }, error => {
        console.log(error);
      });
    }
    else {
      //Nuevo Producto
      console.log('Nuevo Producto');
      
    }

  }

  onSubmit() { 
    console.log("Submit realizado");
    if (this.producto.idProducto) {
      //Viene de Editar
      this.productoService.actualizarProducto(this.producto).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/productos']);
        }
      );
    }
    else { 
      //Viene de crear Nuevo Producto
      console.log('Nuevo Producto');
      this.productoService.agregarProducto(this.producto).subscribe(data => { 
        this.router.navigate(['/productos']);
      });
    }

  }

}