import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShopRoutingModules} from './shop-routing.modules';
import {SharedModule} from '../shared/shared.module';
import {ShopGrantsComponent} from './shop-grants/shop-grants.component';
import {ShopMemotypesComponent} from './shop-memotypes/shop-memotypes.component';
import {ShopPickaxeComponent} from './shop-pickaxe/shop-pickaxe.component';
import {ShopCoockiesComponent} from './shop-coockies/shop-coockies.component';
import {ShopPublishComponent} from './shop-publish/shop-publish.component';
import {ShopResurrectionComponent} from './shop-resurrection/shop-resurrection.component';
import {ShopNickComponent} from './shop-nick/shop-nick.component';
import {ShopPriceComponent} from './shared/shop-price/shop-price.component';
import {ShopButtonComponent} from './shared/shop-button/shop-button.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ShopMemeComponent} from './shared/shop-meme/shop-meme.component';
import {MemesModule} from '../memes/memes.module';
import {MemotypeModule} from '../memotype/memotype.module';
import {OwlModule} from 'ngx-owl-carousel';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ShopTokensComponent} from './shop-tokens/shop-tokens.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ShopRoutingModules,
    FormsModule,
    ReactiveFormsModule,
    MemesModule,
    MemotypeModule,
    OwlModule,
    NgbModule
  ],
  declarations: [
    ShopButtonComponent,
    ShopPriceComponent,
    ShopMemeComponent,
    ShopCoockiesComponent,
    ShopMemotypesComponent,
    ShopGrantsComponent,
    ShopPickaxeComponent,
    ShopResurrectionComponent,
    ShopNickComponent,
    ShopPublishComponent,
    ShopTokensComponent
  ]
})
export class ShopModule {

}
