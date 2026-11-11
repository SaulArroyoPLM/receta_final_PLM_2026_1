import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-placeholder',
  templateUrl: './placeholder.html',
  styleUrl: './placeholder.scss',
})
export class Placeholder {
  private readonly route = inject(ActivatedRoute);

  readonly titulo = toSignal(
    this.route.data.pipe(map((data) => (data['titulo'] as string) ?? 'Sección')),
    { initialValue: 'Sección' },
  );
}
