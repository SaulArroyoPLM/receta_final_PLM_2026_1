import { Component, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

export interface DiaCalendario {
  numero: number;
  esOtroMes?: boolean;
  esNegrita?: boolean;
}

@Component({
  selector: 'app-appointment-calendar',
  imports: [MatExpansionModule],
  templateUrl: './appointment-calendar.html',
  styleUrl: './appointment-calendar.scss',
})
export class AppointmentCalendar {
  readonly panelOpenState = signal(true);

  mesActual = 'Junio';
  anioActual = '2025';
  diaSeleccionado = 24;
  hora = '12';
  minutos = '00';

  readonly dias: DiaCalendario[] = [
    { numero: 26, esOtroMes: true },
    { numero: 27, esOtroMes: true },
    { numero: 28, esOtroMes: true },
    { numero: 29, esOtroMes: true },
    { numero: 30, esOtroMes: true },
    { numero: 31, esOtroMes: true },
    { numero: 1 },

    { numero: 2 },
    { numero: 3 },
    { numero: 4 },
    { numero: 5 },
    { numero: 6 },
    { numero: 7 },
    { numero: 8 },

    { numero: 9 },
    { numero: 10 },
    { numero: 11 },
    { numero: 12 },
    { numero: 13 },
    { numero: 14 },
    { numero: 15 },

    { numero: 16 },
    { numero: 17 },
    { numero: 18 },
    { numero: 19 },
    { numero: 20 },
    { numero: 21 },
    { numero: 22 },

    { numero: 23, esNegrita: true },
    { numero: 24, esNegrita: true },
    { numero: 25, esNegrita: true },
    { numero: 26, esNegrita: true },
    { numero: 27, esNegrita: true },
    { numero: 28, esNegrita: true },
    { numero: 29, esNegrita: true },

    { numero: 30, esNegrita: true },
    { numero: 1, esOtroMes: true },
    { numero: 2, esOtroMes: true },
    { numero: 3, esOtroMes: true },
    { numero: 4, esOtroMes: true },
    { numero: 5, esOtroMes: true },
    { numero: 6, esOtroMes: true },
  ];

  seleccionarDia(d: DiaCalendario) {
    if (!d.esOtroMes) {
      this.diaSeleccionado = d.numero;
    }
  }
}
