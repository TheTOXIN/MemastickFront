import {Injectable, OnInit} from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import {VERSION} from '../app.constants';

@Injectable()
export class PwaService implements OnInit{

  public promptEvent;

  constructor(
    private swUpdate: SwUpdate,
  ) {
    window.addEventListener('beforeinstallprompt', event => {
      this.promptEvent.preventDefault();
      this.promptEvent = event;
    });

  }

  ngOnInit(): void {
    this.swUpdate.available.subscribe(event => {
      if (confirm('Мемастик обновился до версии: ' + VERSION)) {
        window.location.reload();
      } else {
        window.location.reload();
      }
    });

    this.swUpdate.checkForUpdate();
  }
}
