import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/take';
import {AngularFirestore} from '@angular/fire/firestore';
import {MemeApiService} from './meme-api-service';
import {Meme} from '../model/Meme';

interface QueryConfig {
  sort?: string;
  page?: number;
  size?: number;
  reverse?: boolean;
  prepend?: boolean;
}

@Injectable()
export class MemesPaginationService implements OnInit {

  private _done = new BehaviorSubject(false);
  private _loading = new BehaviorSubject(false);
  private _data = new BehaviorSubject([]);

  private query: QueryConfig;

  public data: Observable<any>;
  public done: Observable<boolean> = this._done.asObservable();
  public loading: Observable<boolean> = this._loading.asObservable();

  constructor(
    private afs: AngularFirestore,
    private memeApi: MemeApiService
  ) {

  }

  ngOnInit() {
    this.query = {
      page: 0,
      size: 3,
      sort: 'date',
      reverse: false,
      prepend: false,
    };

    this.more();

    this.data = this._data.asObservable()
      .scan((acc, val) => {
        return this.query.prepend ? val.concat(acc) : acc.concat(val);
      });
  }

  public more() {
    if (this._done.value || this._loading.value) {
      return;
    }

    this._loading.next(true);

    return this.memeApi.memePage(
      this.query.page,
      this.query.size,
      this.query.sort
    ).subscribe((data) => {
      let memes: Meme[] = data;

      memes = this.query.prepend ? memes.reverse() : memes;

      this._data.next(memes);
      this._loading.next(false);

      if (!memes.length) {
        this._done.next(true);
      }

      this.query.page++;
    });
  }

  reset() {
    this._data.next([]);
    this._done.next(false);
  }

}


