import {MemesComponent} from '../memes/memes/memes.component';
import {RouterModule, Routes} from '@angular/router';
import {MemesShareComponent} from '../memes/memes-share/memes-share.component';
import {MemeCreatorComponent} from '../memes/meme-creator/meme-creator.component';
import {NgModule} from '@angular/core';
import {MemotypeCollectionComponent} from './memotype-collection/memotype-collection.component';

const routes: Routes = [
  {
    path: 'memotype',
    children: [
      {
        path: 'collection',
        component: MemotypeCollectionComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemotypeRoutingModule {

}
