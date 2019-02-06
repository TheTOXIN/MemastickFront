import {Routes} from '@angular/router';
import {ErrorPageComponent} from './pages/error-page/error-page.component';

export const rootRouterConfig: Routes = [
  {
    path: 'start',
    loadChildren: './start/start.module#StartModule'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule'
  },
  {
    path: 'pages',
    loadChildren: './pages/pages.module#PagesModule'
  },
  {
    path: '**',
    component: ErrorPageComponent
  }
];

