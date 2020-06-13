import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class NotifyCounterService {

  private counterItemBehavior: BehaviorSubject<number>;
  private counterItemObservable: Observable<number>;

  private counterBellBehavior: BehaviorSubject<number>;
  private counterBellObservable: Observable<number>;

  constructor() {
    this.counterItemBehavior = new BehaviorSubject(0);
    this.counterItemObservable = this.counterItemBehavior.asObservable();

    this.counterBellBehavior = new BehaviorSubject(0);
    this.counterBellObservable = this.counterBellBehavior.asObservable();
  }

  public triggerItemCounter(count: number) {
    this.counterItemBehavior.next(count);
  }

  public subscribeItemCounter(): Observable<number> {
    return this.counterItemObservable.pipe();
  }

  public triggerBellCounter(count: number) {
    this.counterBellBehavior.next(count);
  }

  public subscribeBellCounter(): Observable<number> {
    return this.counterBellObservable.pipe();
  }
}
