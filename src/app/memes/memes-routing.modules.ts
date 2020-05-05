import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {MemesComponent} from './memes/memes.component';
import {MemeCreatorComponent} from './meme-creator/meme-creator.component';
import {MemesShareComponent} from './memes-share/memes-share.component';
import {MemeResearchLinkComponent} from './meme-research-link/meme-research-link.component';

const routes: Routes = [
  {
    path: 'memes',
    children: [
      {
        path: '',
        component: MemesComponent
      },
      {
        path: 'share/:id',
        component: MemesShareComponent
      },
      {
        path: 'research/:id',
        component: MemeResearchLinkComponent
      },
      {
        path: 'create',
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
