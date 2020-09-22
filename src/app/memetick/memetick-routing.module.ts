import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {MemetickComponent} from './memetick/memetick.component';
import {MemetickRatingComponent} from './memetick-rating/memetick-rating.component';
import {MemetickListComponent} from './memetick-list/memetick-list.component';
import {MemetickListPageComponent} from './memetick-list-page/memetick-list-page.component';

const routes: Routes = [
  {
    path: 'memetick',
    children: [
      {
        path: 'list',
        component: MemetickListPageComponent
      },
      {
        path: 'rating',
        component: MemetickRatingComponent
      },
      {
        path: 'me',
        component: MemetickComponent
      },
      {
        path: ':id',
        component: MemetickComponent
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
