import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SliderMenu } from '../../components/slider-menu/slider-menu';

@Component({
  selector: 'app-layout',
  imports: [SliderMenu, RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {}
