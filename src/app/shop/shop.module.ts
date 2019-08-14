import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ShopRoutingModules} from './shop-routing.modules';
import {SharedModule} from '../shared/shared.module';
import {ShopAllowanceComponent} from './shop-allowance/shop-allowance.component';
import {ShopGrantsComponent} from './shop-grants/shop-grants.component';
import {ShopMemotypesComponent} from './shop-memotypes/shop-memotypes.component';
import {ShopPickaxeComponent} from './shop-pickaxe/shop-pickaxe.component';
import {ShopCoockiesComponent} from './shop-coockies/shop-coockies.component';
import {ShopPublishComponent} from './shop-publish/shop-publish.component';
import {ShopResurrectionComponent} from './shop-resurrection/shop-resurrection.component';
import {ShopNickComponent} from './shop-nick/shop-nick.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ShopRoutingModules
  ],
  declarations: [
    ShopCoockiesComponent,
    ShopMemotypesComponent,
    ShopAllowanceComponent,
    ShopGrantsComponent,
    ShopPickaxeComponent,
    ShopResurrectionComponent,
    ShopNickComponent,
    ShopPublishComponent
  ]
})
export class ShopModule {

}
