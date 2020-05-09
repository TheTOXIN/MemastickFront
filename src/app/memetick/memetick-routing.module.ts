import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {MemetickComponent} from './memetick/memetick.component';
import {MemetickRatingComponent} from './memetick-rating/memetick-rating.component';
import {MemetickListComponent} from './memetick-list/memetick-list.component';

const routes: Routes = [
  {
    path: 'memetick',
    children: [
      {
        path: 'me',
        component: MemetickComponent
      },
      {
        path: ':id',
        component: MemetickComponent
      },
      {
        path: 'rating',
        component: MemetickRatingComponent
      },
      {
        path: 'list',
        component: MemetickListComponent
      },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemetickRoutingModule {

}
