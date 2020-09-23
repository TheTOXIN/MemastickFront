import {RouterModule, Routes} from '@angular/router';
import {DonateRatingComponent} from './donate-rating/donate-rating.component';
import {DonateMessagesComponent} from './donate-messages/donate-messages.component';
import {NgModule} from '@angular/core';
import {DonateComponent} from './donate.component';

const routes: Routes = [{
  path: 'donate',
  children: [{
    path: '',
    component: DonateComponent
  }, {
    path: 'rating',
    component: DonateRatingComponent
  }, {
    path: 'messages',
    component: DonateMessagesComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DonateRoutes {

}
