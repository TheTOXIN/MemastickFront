import {RouterModule, Routes} from '@angular/router';
import {DonateMessagesComponent} from './donate-messages/donate-messages.component';
import {NgModule} from '@angular/core';
import {DonateComponent} from './donate.component';
import {DonateRatingsComponent} from './donate-ratings/donate-ratings.component';

const routes: Routes = [{
  path: 'donate',
  children: [{
    path: '',
    component: DonateComponent
  }, {
    path: 'ratings',
    component: DonateRatingsComponent
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
