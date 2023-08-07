import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CorreoService {
  BASE_URL = 'http://localhost:3000';; // Ruta del endpoint en el backend

  constructor(private http: HttpClient) {}

  //Conexion con la base de datos, envio de correo eléctronico
  enviarCorreo(email: string, subject: string, text: string) {
    console.log('Datos de correo electrónico:', { email, subject, text });
    console.log(`${this.BASE_URL}/correo/${email}`);
    return this.http.post<any>(`${this.BASE_URL}/correo/${email}`, { subject, text });
  }
}