import { Routes } from '@angular/router';

const placeholder = () =>
    import('./pages/placeholder/placeholder').then((m) => m.Placeholder);

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadComponent: () => import('./pages/home/home').then((m) => m.Home) },

    { path: 'pacientes', loadComponent: placeholder, data: { titulo: 'Pacientes' } },
    { path: 'consultar-medicamentos', loadComponent: placeholder, data: { titulo: 'Consultar medicamentos' } },
    { path: 'agenda', loadComponent: placeholder, data: { titulo: 'Agenda' } },
    { path: 'datos-personales', loadComponent: placeholder, data: { titulo: 'Datos personales' } },
    { path: 'datos-profesionales', loadComponent: placeholder, data: { titulo: 'Datos profesionales' } },
    { path: 'consultorios', loadComponent: placeholder, data: { titulo: 'Consultorios y recetas' } },
    { path: 'firma', loadComponent: placeholder, data: { titulo: 'Verificación y firma' } },
    { path: 'receta', loadComponent: placeholder, data: { titulo: 'Nueva receta' } },

    { path: '**', redirectTo: 'home' },
];