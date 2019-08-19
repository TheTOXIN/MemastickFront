import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MemotypeCollectionComponent} from './memotype-collection/memotype-collection.component';
import {MemotypeRoutingModule} from './memotype-routing.module';

@NgModule({
  declarations: [
    MemotypeCollectionComponent
  ],
  imports: [
    CommonModule,
    MemotypeRoutingModule
  ]
})
export class MemotypeModule { }
