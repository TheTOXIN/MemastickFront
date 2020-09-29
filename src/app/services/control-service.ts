import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class ControlService {

  private controllerBehavior: BehaviorSubject<boolean>;
  private controllerObservable: Observable<boolean>;

  constructor() {
    this.controllerBehavior = new BehaviorSubject(true);
    this.controllerObservable = this.controllerBehavior.asObservable();
  }

  public show() {
    this.controllerBehavior.next(true);
  }

  public hide() {
    this.controllerBehavior.next(false);
  }

  public watch(): Observable<boolean> {
    return this.controllerObservable.pipe();
  }
}
