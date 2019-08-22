import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MemotypeCollectionComponent} from './memotype-collection/memotype-collection.component';
import {MemotypeRoutingModule} from './memotype-routing.module';
import {SharedModule} from '../shared/shared.module';
import {MemotypeViewComponent} from './memotype-view/memotype-view.component';
import {MemotypeSetModalComponent} from './memotype-set-modal/memotype-set-modal.component';
import {MemotypeSetHeadComponent} from './memotype-set-head/memotype-set-head.component';
import {MemotypeElementComponent} from './memotype-element/memotype-element.component';

@NgModule({
  declarations: [
    MemotypeCollectionComponent,
    MemotypeViewComponent,
    MemotypeSetModalComponent,
    MemotypeSetHeadComponent,
    MemotypeElementComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MemotypeRoutingModule
  ],
  exports: [
    MemotypeSetModalComponent
  ],
  entryComponents: [
    MemotypeSetModalComponent
  ]
})
export class MemotypeModule { }
