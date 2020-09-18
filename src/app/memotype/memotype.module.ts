import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MemotypeCollectionComponent} from './memotype-collection/memotype-collection.component';
import {MemotypeRoutingModule} from './memotype-routing.module';
import {SharedModule} from '../shared/shared.module';
import {MemotypeViewComponent} from './memotype-view/memotype-view.component';
import {MemotypeSetModalComponent} from './memotype-set-modal/memotype-set-modal.component';
import {MemotypeSetHeadComponent} from './memotype-set-head/memotype-set-head.component';
import {MemotypeElementComponent} from './memotype-element/memotype-element.component';
import {MemotypeRaritiesComponent} from './memotype-rarities/memotype-rarities.component';
import {MemotypeRarityModalComponent} from './memotype-rarity-modal/memotype-rarity-modal.component';
import {OwlModule} from 'ngx-owl-carousel';
import {MemotypesReadComponent} from './memotypes-read/memotypes-read.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    OwlModule,
    MemotypeRoutingModule,
  ],
  exports: [
    MemotypeSetModalComponent,
    MemotypeSetHeadComponent,
    MemotypeElementComponent,
    MemotypeRaritiesComponent,
    MemotypeRarityModalComponent,
    MemotypeViewComponent,
    MemotypesReadComponent,
  ],
  declarations: [
    MemotypeCollectionComponent,
    MemotypeViewComponent,
    MemotypeSetModalComponent,
    MemotypeSetHeadComponent,
    MemotypeElementComponent,
    MemotypeRaritiesComponent,
    MemotypeRarityModalComponent,
    MemotypesReadComponent,
  ],
  entryComponents: [
    MemotypesReadComponent,
    MemotypeSetModalComponent,
    MemotypeRarityModalComponent,
  ]
})
export class MemotypeModule {

}
