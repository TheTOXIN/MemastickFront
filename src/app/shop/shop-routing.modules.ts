import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ShopComponent} from './shop.component';

const routes: Routes = [
  {
    path: 'shop',
    children: [
      {
        path: '',
        component: ShopComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModules {

}
