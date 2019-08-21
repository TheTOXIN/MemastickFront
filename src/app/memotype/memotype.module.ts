import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MemotypeCollectionComponent} from './memotype-collection/memotype-collection.component';
import {MemotypeRoutingModule} from './memotype-routing.module';
import {SharedModule} from '../shared/shared.module';
import {MemotypeViewComponent} from './memotype-view/memotype-view.component';
import {MemotypeSetModalComponent} from './memotype-set-modal/memotype-set-modal.component';

@NgModule({
  declarations: [
    MemotypeCollectionComponent,
    MemotypeViewComponent,
    MemotypeSetModalComponent
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
