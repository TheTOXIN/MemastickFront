import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import {GlobalConst} from '../consts/GlobalConst';

@Injectable()
export class PwaService {

  constructor(private swUpdate: SwUpdate) {
    swUpdate.available.subscribe(event => {
      alert('Мемастик обновился до версии: ' + GlobalConst.VERSION);
      window.location.reload();
    });
  }
}
