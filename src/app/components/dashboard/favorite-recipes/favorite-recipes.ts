import { Component, inject, signal } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmDialog } from '../../shared/confirm-dialog/confirm-dialog';

export interface RecetaFavorita {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-favorite-recipes',
  imports: [MatDialogModule, MatExpansionModule, MatIconModule],
  templateUrl: './favorite-recipes.html',
  styleUrl: './favorite-recipes.scss',
})
export class FavoriteRecipes {
  private readonly dialog = inject(MatDialog);

  readonly panelOpenState = signal(true);

  recetas: RecetaFavorita[] = [
    { id: 1, nombre: 'Resfriado común' },
    { id: 2, nombre: 'Lumbalgia aguda' },
    { id: 3, nombre: 'Migraña' },
    { id: 4, nombre: 'Diarrea' },
  ];

  onEliminar(r: RecetaFavorita) {
    this.dialog
      .open(ConfirmDialog, {
        data: {
          title: 'Eliminar receta',
          message: `¿Eliminar la receta "${r.nombre}"?`,
          confirmLabel: 'Eliminar',
        },
      })
      .afterClosed()
      .subscribe((confirmed) => {
        if (confirmed) {
          this.recetas = this.recetas.filter((x) => x.id !== r.id);
        }
      });
  }
}
