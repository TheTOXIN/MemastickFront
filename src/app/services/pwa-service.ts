import {Injectable, OnInit} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';

@Injectable()
export class PwaService implements OnInit {

  constructor(
    private swu: SwUpdate,
  ) {
    // add try beforeinstallprompt
  }

  ngOnInit(): void {
    if (this.swu.isEnabled) {
        this.swu.checkForUpdate()
          .then(() => console.log('CHECK UPDATE'));
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
