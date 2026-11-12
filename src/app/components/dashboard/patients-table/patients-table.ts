import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ConfirmDialog } from '../../shared/confirm-dialog/confirm-dialog';

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
  imports: [MatDialogModule, MatExpansionModule, MatIconModule, MatTableModule],
  templateUrl: './patients-table.html',
  styleUrl: './patients-table.scss',
})
export class PatientsTable implements OnInit {
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly dialog = inject(MatDialog);

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

  onEliminar(paciente: Paciente, event: Event) {
    event.stopPropagation();

    this.dialog
      .open(ConfirmDialog, {
        data: {
          title: 'Eliminar paciente',
          message: `¿Estás seguro de eliminar a ${this.getNombreCompleto(paciente)}?`,
          confirmLabel: 'Eliminar',
        },
      })
      .afterClosed()
      .subscribe((confirmed) => {
        if (confirmed) {
          const index = this.pacientes.findIndex((p) => p.id === paciente.id);
          if (index > -1) {
            this.pacientes.splice(index, 1);
            this.pacientes = [...this.pacientes];
          }
        }
      });
  }
}
