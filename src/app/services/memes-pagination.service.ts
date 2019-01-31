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
  page: number;
  size: number;
  sort: string;
  reverse: boolean;
}

@Injectable()
export class MemesPaginationService {

  private _loading = new BehaviorSubject(false);
  private _data = new BehaviorSubject([]);

  private query: QueryConfig;

  public data: Observable<any>;
  public loading: Observable<boolean> = this._loading.asObservable();

  constructor(
    private afs: AngularFirestore,
    private memeApi: MemeApiService
  ) {

  }

  init(sizePage, sizeInit, sortFiled, isReverse) {
    this.query = {
      page: 0,
      size: sizeInit,
      sort: sortFiled,
      reverse: isReverse,
    };

    if (this.query.reverse) { this.query.sort += ',desc'; }

    this.more();
    this.query.size = sizePage;
    this.data = this._data.asObservable().scan((acc, val) => {
        return acc.concat(val);
    });
  }

  public more() {
    if (this._loading.value) { return; }

    this._loading.next(true);

    this.memeApi.memePage(
      this.query.page,
      this.query.size,
      this.query.sort
    ).subscribe((data) => {
      const memes: Meme[] = data;

      this._data.next(memes);
      this._loading.next(false);

      this.query.page++;
    });
  }

}


