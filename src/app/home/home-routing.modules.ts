import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {MemesComponent} from './memes/memes.component';
import {HomeComponent} from './home.component';
import {MemeCreatorComponent} from './meme-creator/meme-creator.component';
import {MemetickComponent} from './memetick/memetick.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'memes',
        component: MemesComponent
      },
      {
        path: 'memes/create',
        component: MemeCreatorComponent
      },
      {
        path: 'memetick/me',
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
