import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ShopCoockiesComponent} from './shop-coockies/shop-coockies.component';
import {ShopMemotypesComponent} from './shop-memotypes/shop-memotypes.component';
import {ShopGrantsComponent} from './shop-grants/shop-grants.component';
import {ShopPickaxeComponent} from './shop-pickaxe/shop-pickaxe.component';
import {ShopResurrectionComponent} from './shop-resurrection/shop-resurrection.component';
import {ShopNickComponent} from './shop-nick/shop-nick.component';
import {ShopPublishComponent} from './shop-publish/shop-publish.component';
import {ShopTokensComponent} from './shop-tokens/shop-tokens.component';
import {ShopComponent} from './shop.component';

const routes: Routes = [{
  path: '',
  children: [{
    path: '',
    component: ShopComponent,
  }, {
    path: 'cookies',
    component: ShopCoockiesComponent
  }, {
    path: 'memotypes',
    component: ShopMemotypesComponent
  }, {
    path: 'tokens',
    component: ShopTokensComponent
  }, {
    path: 'grants',
    component: ShopGrantsComponent
  }, {
    path: 'pickaxe',
    component: ShopPickaxeComponent
  }, {
    path: 'resurrection',
    component: ShopResurrectionComponent
  }, {
    path: 'nick',
    component: ShopNickComponent
  }, {
    path: 'publish',
    component: ShopPublishComponent
  },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModules {

}
