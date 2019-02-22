import {Routes} from '@angular/router';
import {ErrorPageComponent} from './pages/error-page/error-page.component';
import {RedirectRootComponent} from './shared/redirect-root/redirect-root.component';

export const rootRouterConfig: Routes = [
  {
    path: '',
    component: RedirectRootComponent,
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
    path: 'memes',
    loadChildren: './memes/memes.module#MemesModule'
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

