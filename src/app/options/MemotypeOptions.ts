import {UUID} from 'angular2-uuid';
import {MemotypeSet} from '../model/memotype/MemotypeSet';
import {EventEmitter} from '@angular/core';
import {Memotype} from '../model/memotype/Memotype';

export interface MemotypeOptions {
  memetickId: UUID;
  collection?: MemotypeSet[];
  selectMode?: boolean;
  selectEvent?: EventEmitter<Memotype>;
}
