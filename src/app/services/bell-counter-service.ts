import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class BellCounterService {

  private counterBehavior: BehaviorSubject<boolean>;
  private  counterObservable: Observable<boolean>;

  constructor() {
    this.counterBehavior = new BehaviorSubject(false);
    this.counterObservable = this.counterBehavior.asObservable();
  }

  public triggerCounter() {
    this.counterBehavior.next(true);
  }

  public subscribeCounter(): Observable<boolean> {
    return this.counterObservable.pipe();
  }
}
