import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard-footer',
  imports: [],
  templateUrl: './dashboard-footer.html',
  styleUrls: ['./dashboard-footer.scss']
})
export class DashboardFooter {

  constructor(private router: Router) { }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}