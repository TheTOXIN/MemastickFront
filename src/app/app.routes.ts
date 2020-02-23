import {Routes} from '@angular/router';
import {ErrorPageComponent} from './pages/error-page/error-page.component';
import {ModalLinkComponent} from './shared/modal-link/modal-link.component';
import {ShopComponent} from './shop/shop.component';
import {DonaterRatingComponent} from './shared/donater-rating/donater-rating.component';
import {AppComponent} from './app.component';

export const rootRouterConfig: Routes = [
  {
    path: '',
    component: AppComponent,
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
    path: 'shop',
    component: ShopComponent,
    loadChildren: './shop/shop.module#ShopModule'
  },
  {
    path: 'modal',
    component: ModalLinkComponent
  },
  {
    path: 'donaters',
    component: DonaterRatingComponent
  },
  {
    path: '**',
    component: ErrorPageComponent
  }
];

