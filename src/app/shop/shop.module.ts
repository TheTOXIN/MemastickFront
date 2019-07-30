import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import {ShopRoutingModules} from './shop-routing.modules';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ShopRoutingModules
  ],
  declarations: [
    ShopComponent
  ]
})
export class ShopModule { }
