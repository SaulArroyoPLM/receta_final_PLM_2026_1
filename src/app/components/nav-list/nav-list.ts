import { Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavItem } from '../../models/nav-item';

@Component({
  selector: 'app-nav-list',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-list.html',
  styleUrl: './nav-list.scss',
})
export class NavList {
  readonly items = input<NavItem[]>([]);
  readonly navegar = output<void>();
}
