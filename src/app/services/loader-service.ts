import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {LoaderState} from '../state/loader-state';

@Injectable()
export class LoaderService {

  private loaderBehavior: BehaviorSubject<LoaderState>;
  private loaderObservable: Observable<LoaderState>;

  constructor() {
    this.loaderBehavior = new BehaviorSubject(new LoaderState());
    this.loaderObservable = this.loaderBehavior.asObservable();
  }

  public set(state: LoaderState) {
    this.loaderBehavior.next(state);
  }

  public get(): Observable<LoaderState> {
    return this.loaderObservable.pipe();
  }
}
