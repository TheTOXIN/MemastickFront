import {HammerGestureConfig} from '@angular/platform-browser';
import * as Hammer from 'hammerjs';

export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any>{
    'pan': { direction: Hammer.DIRECTION_ALL  }
  };
}
