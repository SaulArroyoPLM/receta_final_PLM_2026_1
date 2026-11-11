import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';

export interface RecetaFavorita {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-favorite-recipes',
  templateUrl: './favorite-recipes.html',
  styleUrl: './favorite-recipes.scss',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatExpansionModule],
})
export class FavoriteRecipes {
  readonly panelOpenState = signal(true);

  recetas: RecetaFavorita[] = [
    { id: 1, nombre: 'Resfriado común' },
    { id: 2, nombre: 'Lumbalgia aguda' },
    { id: 3, nombre: 'Migraña' },
    { id: 4, nombre: 'Diarrea' },
  ];

  onUsar(r: RecetaFavorita) {
    console.log('Usar receta:', r);
  }

  onEliminar(r: RecetaFavorita) {
    if (confirm(`¿Eliminar la receta "${r.nombre}"?`)) {
      this.recetas = this.recetas.filter((x) => x.id !== r.id);
    }
  }

  onVerTodas() {
    console.log('Ver todas las recetas');
  }
}
