import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './home.component';
import {MemetickComponent} from './memetick/memetick.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'memetick/me',
        component: MemetickComponent
      },
      {
        path: 'memetick/:id',
        component: MemetickComponent
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
