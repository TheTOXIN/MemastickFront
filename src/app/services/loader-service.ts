import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {LoaderState} from '../state/loader-state';
import {LoaderStatus} from '../consts/LoaderStatus';

@Injectable()
export class LoaderService {

  private loaderBehavior: BehaviorSubject<LoaderState>;
  private loaderObservable: Observable<LoaderState>;

  constructor() {
    this.loaderBehavior = new BehaviorSubject(new LoaderState());
    this.loaderObservable = this.loaderBehavior.asObservable();
  }

  public setLoad(message: string) {
    this.set(new LoaderState(
      LoaderStatus.LOAD,
      message,
    ));
  }

  public setDone(message: string) {
    this.set(new LoaderState(
      LoaderStatus.DONE,
      message,
    ));
  }

  public setDoneEvent(message: string, event: any) {
    this.set(new LoaderState(
      LoaderStatus.DONE,
      message,
      event
    ));
  }

  public setError(message: string) {
    this.set(new LoaderState(
      LoaderStatus.ERROR,
      message
    ));
  }

  public setErrorEvent(message: string, event: any) {
    this.set(new LoaderState(
      LoaderStatus.ERROR,
      message,
      event
    ));
  }

  public setNone() {
    this.set(new LoaderState(
      LoaderStatus.NONE
    ));
  }

  public set(state: LoaderState) {
    this.loaderBehavior.next(state);
  }

  public get(): Observable<LoaderState> {
    return this.loaderObservable.pipe();
  }
}
