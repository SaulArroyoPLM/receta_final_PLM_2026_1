import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

export interface Paciente {
  id: number;
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  sexo: string;
  edad: number;
  diagnostico?: {
    header: string;
    fecha: string;
    titulo: string;
  };
}

@Component({
  selector: 'app-patients-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatExpansionModule,
    MatChipsModule,
  ],
  templateUrl: './patients-table.html',
  styleUrl: './patients-table.scss',
})
export class PatientsTable implements OnInit {
  displayedColumns: string[] = [
    'nombre',
    'primerApellido',
    'segundoApellido',
    'sexo',
    'edad',
    'acciones',
  ];

  isMobile = false;
  expandedElement: Paciente | null = null;

  pacientes: Paciente[] = [
    {
      id: 1,
      nombre: 'María Magdalena',
      primerApellido: 'Gómez',
      segundoApellido: 'Hernández',
      sexo: 'F',
      edad: 37,
      diagnostico: {
        header: 'Última receta emitida',
        fecha: '03/06/2025',
        titulo: 'Úlcera gástrica | Anemia poshemorrágica crónica',
      },
    },
    {
      id: 2,
      nombre: 'Ramiro Fernando',
      primerApellido: 'Gómez',
      segundoApellido: 'Gómez',
      sexo: 'M',
      edad: 35,
      diagnostico: {
        header: 'Última receta emitida',
        fecha: '28/07/2025',
        titulo: 'Hipertensión arterial | Diabetes mellitus tipo 2',
      },
    },
    {
      id: 3,
      nombre: 'Ramiro Fernando',
      primerApellido: 'Hernández',
      segundoApellido: 'Fernández',
      sexo: 'M',
      edad: 35,
      diagnostico: {
        header: 'Última receta emitida',
        fecha: '20/07/2025',
        titulo: 'Bronquitis aguda | Síndrome gripal',
      },
    },
  ];

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe((result) => {
      this.isMobile = result.matches;
    });
  }

  getNombreCompleto(paciente: Paciente): string {
    return `${paciente.nombre} ${paciente.primerApellido} ${paciente.segundoApellido}`;
  }

  getSexoLabel(sexo: string): string {
    return sexo === 'M' ? 'Masculino' : 'Femenino';
  }

  getSexoColor(sexo: string): string {
    return sexo === 'M' ? 'primary' : 'accent';
  }

  toggleRow(element: Paciente) {
    this.expandedElement = this.expandedElement === element ? null : element;
  }

  isExpanded(element: Paciente): boolean {
    return this.expandedElement === element;
  }

  onEditar(paciente: Paciente, event: Event) {
    event.stopPropagation();
    console.log('Editar paciente:', paciente);
  }

  onEliminar(paciente: Paciente, event: Event) {
    event.stopPropagation();
    if (confirm(`¿Estás seguro de eliminar a ${this.getNombreCompleto(paciente)}?`)) {
      const index = this.pacientes.findIndex((p) => p.id === paciente.id);
      if (index > -1) {
        this.pacientes.splice(index, 1);
        this.pacientes = [...this.pacientes];
      }
    }
  }

  onVerReceta(paciente: Paciente, event: Event) {
    event.stopPropagation();
    console.log('Ver receta de:', paciente);
  }

  onResurtir(paciente: Paciente, event: Event) {
    event.stopPropagation();
    console.log('Resurtir receta de:', paciente);
  }
}
