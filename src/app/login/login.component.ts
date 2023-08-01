import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { UsuarioModel } from '../shared/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new UsuarioModel(' ',' ',' ',' ','',' ',' ',' ');
  id: string | undefined;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
  }

  logearse() {
    console.log(this.user);
        this.authService.logearse(this.user.idUsuario, this.user.Contrasena).subscribe(
          (res) => {
            console.log(res);
            localStorage.setItem('token', res.token);
            localStorage.setItem('id', this.user.idUsuario);
            this.router.navigate(['/']);
          },
          (err) => console.log(err)
        );
  }
}
