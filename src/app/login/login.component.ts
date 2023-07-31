import { Component } from '@angular/core';
// import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  // constructor(private authService: AuthService) {}

  // onSubmit() {
  //   // Llama al método de login del servicio de autenticación
  //   this.authService.login(this.username, this.password)
  //     .subscribe(
  //       // Si el inicio de sesión es exitoso, puedes redirigir al usuario a otra página
  //       () => {
  //         // Por ejemplo, redirigir a la página de inicio
  //         // Reemplaza 'home' por la ruta a la página que desees mostrar después del inicio de sesión
  //         this.router.navigate(['/home']);
  //       },
  //       // Si el inicio de sesión falla, muestra un mensaje de error o realiza alguna otra acción
  //       (error) => {
  //         console.error('Error de inicio de sesión:', error);
  //       }
  //     );
  // }
}
