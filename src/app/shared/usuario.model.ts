export class UsuarioModel { 
    constructor(public idUsuario: number, public Nombre: string, public Email:string, public Contrasena:string,
        public Rol: 'Cliente' | 'Administrador', public Direccion:string, public Ciudad:string, public Telefono:string) { 
  
    }
}