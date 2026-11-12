import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-campo-auth',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  template: `
      <div class="campo">
      <label class="campo-box" [class.invalido]="error">
        <span class="campo-lbl">{{ label }}@if (requerido) {<b>*</b>}</span>
        <ng-content />
      </label>
      @if (error) { <span class="campo-msg err">{{ error }}</span> }
      @else if (hint) { <span class="campo-msg">{{ hint }}</span> }
    </div>
  `,
  styleUrl: './campo-auth.scss',
})
export class CampoAuth {
  @Input() label = '';
  @Input() requerido = false;
  @Input() error = '';
  @Input() hint = '';
}
