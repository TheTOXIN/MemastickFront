import {RouterModule, Routes} from '@angular/router';
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
