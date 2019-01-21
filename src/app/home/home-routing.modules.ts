import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from '../home/home.component';
import {NgModule} from '@angular/core';
import {MemesComponent} from './memes/memes.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'memes',
        component: MemesComponent,
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
