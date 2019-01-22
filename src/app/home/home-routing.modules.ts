import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {MemesComponent} from './memes/memes.component';
import {HomeComponent} from './home.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'memes',
        component: MemesComponent
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
