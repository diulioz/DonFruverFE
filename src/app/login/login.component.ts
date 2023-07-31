import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { UsuarioModel } from '../shared/usuario.model';
// import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new UsuarioModel(' ',' ',' ',' ','Administrador',' ',' ',' ')
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    
  }

  logearse(){
    console.log(this.user)
    this.authService.logearse(this.user.idUsuario,this.user.Contrasena)
    .subscribe(
      res =>{
        console.log(res)
      },
      err => console.log(err)
    )
  }


}
