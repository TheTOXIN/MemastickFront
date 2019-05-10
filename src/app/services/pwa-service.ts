import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import {GlobalConst} from '../consts/GlobalConst';

@Injectable()
export class PwaService {

  public promptEvent;

  constructor(
    private swUpdate: SwUpdate,
  ) {
    swUpdate.available.subscribe(event => {
      if (confirm('Мемастик обновился до версии: ' + GlobalConst.VERSION)) {
        window.location.reload();
      } else {
        window.location.reload();
      }
    });
    window.addEventListener('beforeinstallprompt', event => {
      this.promptEvent.preventDefault();
      this.promptEvent = event;
    });
  }
}
