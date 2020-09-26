import {HammerGestureConfig} from '@angular/platform-browser';
import * as Hammer from 'hammerjs';
import { Injectable } from "@angular/core";

@Injectable()
export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any>{
    'pan': { direction: Hammer.DIRECTION_ALL  }
  };
}
