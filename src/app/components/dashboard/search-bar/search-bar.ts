import { Component, EventEmitter, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-search-bar',
  standalone: true,
  templateUrl: './search-bar.html',
  styleUrls: ['./search-bar.scss'],
  imports: [
    FormsModule,
    MatIconModule,
  ]
})
export class SearchBar {

  query = '';

  @Output() buscar = new EventEmitter<string>();
  @Output() modo = new EventEmitter<void>();

  onBuscar() {
    const q = this.query.trim();
    if (q) this.buscar.emit(q);
  }

}