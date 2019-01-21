import {Routes} from '@angular/router';
import {BlogComponent} from './blog/blog.component';
import {ErrorPageComponent} from './pages/error-page/error-page.component';

export const rootRouterConfig: Routes = [
  {
    path: '',
    redirectTo: 'start',
    pathMatch: 'full'
  },
  {
    path: 'start',
    loadChildren: './start/start.module#StartModule'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule'
  },
  {
    path: 'blog',
    component: BlogComponent,
    loadChildren: './blog/blog.module#BlogModule'
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

