import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // title = 'DonFruver';
  constructor(public authService: AuthService){}

  buscarProducto(termino: string) {
    // Aquí puedes implementar la lógica de búsqueda
    // Por ejemplo, puedes realizar una llamada al servicio para obtener los productos que coincidan con el término de búsqueda
    console.log('Buscar producto:', termino);
  }
}
