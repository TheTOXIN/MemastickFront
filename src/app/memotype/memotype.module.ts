import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MemotypeCollectionComponent} from './memotype-collection/memotype-collection.component';
import {MemotypeRoutingModule} from './memotype-routing.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    MemotypeCollectionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MemotypeRoutingModule
  ]
})
export class MemotypeModule { }
