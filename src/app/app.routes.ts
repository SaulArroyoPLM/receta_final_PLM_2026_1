import { Routes } from '@angular/router';

const placeholder = () => import('./pages/placeholder/placeholder').then((m) => m.Placeholder);

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },

  { path: 'login', loadComponent: () => import('./pages/login/login').then((m) => m.LoginPage) },

  {
    path: '',
    loadComponent: () => import('./pages/layout/layout').then((m) => m.Layout),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', loadComponent: () => import('./pages/home/home').then((m) => m.Home) },

      { path: 'pacientes', loadComponent: placeholder, data: { titulo: 'Pacientes' } },
      {
        path: 'consultar-medicamentos',
        loadComponent: placeholder,
        data: { titulo: 'Consultar medicamentos' },
      },
      { path: 'agenda', loadComponent: placeholder, data: { titulo: 'Agenda' } },
      {
        path: 'datos-personales',
        loadComponent: placeholder,
        data: { titulo: 'Datos personales' },
      },
      {
        path: 'datos-profesionales',
        loadComponent: placeholder,
        data: { titulo: 'Datos profesionales' },
      },
      {
        path: 'consultorios',
        loadComponent: placeholder,
        data: { titulo: 'Consultorios y recetas' },
      },
      { path: 'firma', loadComponent: placeholder, data: { titulo: 'Verificación y firma' } },
      { path: 'receta', loadComponent: placeholder, data: { titulo: 'Nueva receta' } },
    ],
  },

  { path: '**', redirectTo: 'login' },
];
