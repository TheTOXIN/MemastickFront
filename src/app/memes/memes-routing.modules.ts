import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {MemesComponent} from './memes/memes.component';
import {MemeCreatorComponent} from './meme-creator/meme-creator.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: MemesComponent
      },
      {
        path: 'memes/create',
        component: MemeCreatorComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemesRoutingModules {

}
