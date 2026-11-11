import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface UsuarioMock {
  nombre: string;
  segundoNombre?: string;
  primerApellido: string;
  segundoApellido?: string;
  especialidad_medica?: string;
  especialidad?: string;
  correo?: string;
}

@Component({
  selector: 'app-welcome-header',
  imports: [CommonModule],
  templateUrl: './welcome-header.html',
  styleUrls: ['./welcome-header.scss'],
})
export class WelcomeHeader {
  @Input() showTitle = true;
  @Input() showRole = false;
  @Input() showEmail = false;

  usuario: UsuarioMock = {
    nombre: 'Dr. Nombre',
    primerApellido: 'Apellido',
  };

  getShortName(): string {
    const nombres = [this.usuario.nombre, this.usuario.segundoNombre]
      .filter(n => n).join(' ').trim();
    return nombres || 'Usuario';
  }

  getApellidos(): string {
    const apellidos = [this.usuario.primerApellido, this.usuario.segundoApellido]
      .filter(a => a).join(' ').trim();
    return apellidos || 'Apellidos';
  }

  getShortRole(): string {
    return this.usuario.especialidad_medica || this.usuario.especialidad || 'Rol';
  }
}