import { Component, effect, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavItem } from '../../models/nav-item';
import { NavList } from '../nav-list/nav-list';

@Component({
  selector: 'app-slider-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NavList],
  templateUrl: './slider-menu.html',
  styleUrl: './slider-menu.scss',
})
export class SliderMenu {
  readonly open = signal(false);
  readonly collapsed = signal(this.leerCollapsed());
  readonly consultorio = signal('Nombre del consultorio');
  readonly consultorios = [
    'Nombre del consultorio',
    'Consultorio 2',
    'Consultorio 3',
    'Consultorio 4',
  ];

  readonly consulta: NavItem[] = [
    { label: 'Nueva receta', icon: 'assets/icons/nueva_receta.svg', route: '/receta' },
    { label: 'Pacientes', icon: 'assets/icons/pacientes.svg', route: '/pacientes' },
    { label: 'Consultar medicamentos', icon: 'assets/icons/consultar_medica.svg', route: '/consultar-medicamentos' },
    { label: 'Agenda', icon: 'assets/icons/agenda.svg', route: '/agenda' },
  ];

  readonly perfil: NavItem[] = [
    { label: 'Datos personales', icon: 'assets/icons/datos_personales.svg', route: '/datos-personales', badgeType: 'check' },
    { label: 'Datos profesionales', icon: 'assets/icons/datos_profecionales.svg', route: '/datos-profesionales', badgeType: 'check' },
    { label: 'Consultorios', icon: 'assets/icons/consultorio.svg', route: '/consultorios', badge: 1, badgeType: 'count' },
    { label: 'Identidad y Firma', icon: 'assets/icons/firma.svg', route: '/firma', badge: 3, badgeType: 'count' },
  ];

  constructor() {
    effect(() => {
      if (typeof document !== 'undefined') {
        document.body.classList.toggle('menu-open', this.open());
      }
    });

    effect(() => {
      try { localStorage.setItem('menu-collapsed', String(this.collapsed())); } catch {}
    });
  }

  toggle() {
    this.open.update((v) => !v);
  }

  close() {
    this.open.set(false);
  }

  toggleCollapse() {
    this.collapsed.update((v) => !v);
  }

  private leerCollapsed(): boolean {
    try { return localStorage.getItem('menu-collapsed') === 'true'; } catch { return false; }
  }

  onConsultorio(event: Event) {
    this.consultorio.set((event.target as HTMLSelectElement).value);
  }

  onLogout() {
    console.log('Cerrar sesión');
  }
}
