import {Injectable, OnInit} from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import {VERSION} from '../app.constants';
import {interval} from 'rxjs/internal/observable/interval';

@Injectable()
export class PwaService implements OnInit{

  constructor(
    private swu: SwUpdate,
  ) {
    // TODO add try beforeinstallprompt
  }

  ngOnInit(): void {
    if (this.swu.isEnabled) {
      interval(6 * 60 * 60)
        .subscribe(() => this.swu.checkForUpdate()
          .then(() => console.log('CHECK UPDATE')));
    }
  }

  public checkUpdate(action: any): void {
    this.swu.available.subscribe(() => {
      this.swu.activateUpdate().then(() => {
        action.apply();
      });
    });
  }
}
