import { Component } from '@angular/core';
import { RightSidebar } from '../../components/right-sidebar/right-sidebar';
import { WelcomeHeader } from '../../components/dashboard/welcome-header/welcome-header';
import { SearchBar } from '../../components/dashboard/search-bar/search-bar';
import { PatientsTable } from '../../components/dashboard/patients-table/patients-table';
import { FavoriteRecipes } from '../../components/dashboard/favorite-recipes/favorite-recipes';
import { AppointmentCalendar } from '../../components/dashboard/appointment-calendar/appointment-calendar';
import { DashboardFooter } from '../../components/dashboard/dashboard-footer/dashboard-footer';

@Component({
  selector: 'app-home',
  imports: [
    RightSidebar,
    WelcomeHeader,
    SearchBar,
    PatientsTable,
    FavoriteRecipes,
    AppointmentCalendar,
    DashboardFooter,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home { }
