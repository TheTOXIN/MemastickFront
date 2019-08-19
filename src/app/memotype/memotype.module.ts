import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MemesRoutingModules} from '../memes/memes-routing.modules';
import {MemotypeCollectionComponent} from './memotype-collection/memotype-collection.component';

@NgModule({
  declarations: [
    MemotypeCollectionComponent
  ],
  imports: [
    CommonModule,
    MemesRoutingModules
  ]
})
export class MemotypeModule { }
