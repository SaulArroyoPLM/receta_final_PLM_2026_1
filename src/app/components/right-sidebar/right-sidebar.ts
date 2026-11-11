import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

export interface Aviso {
  texto: string;
  linkTexto?: string;
  linkRuta?: string;
  tipo?: 'credencial' | 'seguridad';
}

@Component({
  selector: 'app-right-sidebar',
  imports: [RouterLink, MatIconModule],
  templateUrl: './right-sidebar.html',
  styleUrl: './right-sidebar.scss',
})
export class RightSidebar {
  readonly avisos = input<Aviso[]>([
    {
      texto: 'No puedes recetar todavía , primero necesitas registrar al menos un consultorio',
      linkTexto: 'Registrar consultorio',
      linkRuta: '/consultorios',
      tipo: 'credencial',
    },
    {
      texto: 'No puedes recetar todavía porque tu cédula profesional no está verificada.',
      linkTexto: 'Verificar cédula',
      linkRuta: '/firma',
      tipo: 'seguridad',
    },
  ]);
}
