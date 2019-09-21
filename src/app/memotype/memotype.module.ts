import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MemotypeCollectionComponent} from './memotype-collection/memotype-collection.component';
import {MemotypeRoutingModule} from './memotype-routing.module';
import {SharedModule} from '../shared/shared.module';
import {MemotypeViewComponent} from './memotype-view/memotype-view.component';
import {MemotypeSetModalComponent} from './memotype-set-modal/memotype-set-modal.component';
import {MemotypeSetHeadComponent} from './memotype-set-head/memotype-set-head.component';
import {MemotypeElementComponent} from './memotype-element/memotype-element.component';
import {MemotypeReadModalComponent} from './memotype-read-modal/memotype-read-modal.component';
import {MemotypeRaritiesComponent} from './memotype-rarities/memotype-rarities.component';
import {MemotypeRarityModalComponent} from './memotype-rarity-modal/memotype-rarity-modal.component';
import {OwlModule} from 'ngx-owl-carousel';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    OwlModule,
    MemotypeRoutingModule
  ],
  exports: [
    MemotypeSetModalComponent,
    MemotypeSetHeadComponent,
    MemotypeElementComponent,
    MemotypeReadModalComponent,
    MemotypeRaritiesComponent,
    MemotypeRarityModalComponent
  ],
  declarations: [
    MemotypeCollectionComponent,
    MemotypeViewComponent,
    MemotypeSetModalComponent,
    MemotypeSetHeadComponent,
    MemotypeElementComponent,
    MemotypeReadModalComponent,
    MemotypeRaritiesComponent,
    MemotypeRarityModalComponent
  ],
  entryComponents: [
    MemotypeSetModalComponent,
    MemotypeReadModalComponent,
    MemotypeRarityModalComponent
  ]
})
export class MemotypeModule { }
