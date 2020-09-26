import {Routes} from '@angular/router';
import {ErrorPageComponent} from './pages/error-page/error-page.component';
import {ModalLinkComponent} from './shared/modal-link/modal-link.component';
import {AppComponent} from './app.component';
import {LaboratoryComponent} from './laboratory/laboratory.component';
import {ChatComponent} from './chat/chat.component';
import {ShopComponent} from './shop/shop.component';

export const rootRouterConfig: Routes = [
  {
    path: '',
    component: AppComponent,
    pathMatch: 'full'
  },
  {
    path: 'start',
    loadChildren: () => import('./start/start.module').then(m => m.StartModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'memes',
    loadChildren: () => import('./memes/memes.module').then(m => m.MemesModule)
  },
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: 'shop',
    component: ShopComponent,
    loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule)
  },
  {
    path: 'lab',
    component: LaboratoryComponent,
    loadChildren: () => import('./laboratory/laboratory.module').then(m => m.LaboratoryModule)
  },
  {
    path: 'chat',
    component: ChatComponent,
    loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule)
  },
  {
    path: 'modal',
    component: ModalLinkComponent
  },
  {
    path: '**',
    component: ErrorPageComponent
  }
];

