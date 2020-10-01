import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {MemetickRatingComponent} from './memetick-rating/memetick-rating.component';
import {MemetickListPageComponent} from './memetick-list-page/memetick-list-page.component';
import {MemetickPageComponent} from './memetick-page/memetick-page.component';

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
        component: MemetickPageComponent
      },
      {
        path: ':id',
        component: MemetickPageComponent
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
