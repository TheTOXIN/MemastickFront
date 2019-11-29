import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './home.component';
import {MemetickComponent} from './memetick/memetick.component';
import {MemetickRatingComponent} from './memetick-rating/memetick-rating.component';
import {SettingsComponent} from './settings/settings.component';
import {LibraryComponent} from './library/library.component';
import {MiningComponent} from './mining/mining.component';
import {DonaterRatingComponent} from '../shared/donater-rating/donater-rating.component';

const routes: Routes = [
  {
    path: 'home',
    children: [
      {
        path: 'memetick/me',
        component: MemetickComponent
      },
      {
        path: 'memetick/rating',
        component: MemetickRatingComponent
      },
      {
        path: 'memetick/:id',
        component: MemetickComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      },
      {
        path: 'library',
        component: LibraryComponent
      },
      {
        path: 'mining',
        component: MiningComponent
      },
      {
        path: '',
        component: HomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {

}
