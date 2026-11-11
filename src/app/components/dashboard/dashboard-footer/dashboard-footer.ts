import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard-footer',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './dashboard-footer.html',
  styleUrls: ['./dashboard-footer.scss']
})
export class DashboardFooter {

  constructor(private router: Router) { }

  navigateTo(route: string): void {
    this.router.navigate([route]);
    console.log('Navegando a:', route); // Para debug
  }
}