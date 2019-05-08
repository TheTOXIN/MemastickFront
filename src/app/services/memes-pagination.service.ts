import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/take';
import {AngularFirestore} from '@angular/fire/firestore';
import {MemeApiService} from '../api/meme-api-service';
import {MemeData} from '../model/MemeData';
import {MemetickAvatarApiService} from '../api/memetick-avatar-api-service';
import {MemeFilter} from '../consts/MemeFilter';
import {UUID} from 'angular2-uuid';

interface QueryConfig {
  page: number;
  size: number;
  sort: string;
  reverse: boolean;
  filter: MemeFilter;
  step: number;
  memetick: UUID;
}

@Injectable()
export class MemesPaginationService {

  private query: QueryConfig;

  private _empty;
  private _loading;
  private _data;

  public empty: Observable<boolean>;
  public loading: Observable<boolean>;
  public data: Observable<MemeData[]>;

  constructor(
    private afs: AngularFirestore,
    private memeApi: MemeApiService,
    private avatarApi: MemetickAvatarApiService,
  ) {

  }

  init(sizePage, sortFiled, isReverse, filter, step, memetick) {
    this.query = {
      page: 0,
      size: sizePage,
      sort: sortFiled,
      reverse: isReverse,
      filter: filter,
      step: step,
      memetick: memetick
    };

    if (this.query.reverse) {
      this.query.sort += ',desc';
    }

    this.query.size = sizePage;

    this._empty = new BehaviorSubject(false);
    this._loading = new BehaviorSubject(false);
    this._data = new BehaviorSubject([]);

    this.empty = this._empty.asObservable();
    this.loading = this._loading.asObservable();
    this.data = this._data.asObservable().scan((acc, val) => {
      return acc.concat(val);
    });

    this.more();
  }

  public more() {
    if (this._loading.value) { return; }
    if (this._empty.value) { return; }
    this._loading.next(true);

    // TODO to DTO
    this.memeApi.memePages(
      this.query.page,
      this.query.size,
      this.query.sort,
      this.query.filter,
      this.query.step,
      this.query.memetick
    ).subscribe((pages) => {
      if (pages.length === 0 || pages == null) {
        this._loading.next(false);
        this._empty.next(true);
        return;
      }

      const result: MemeData[] = [];

      for (const page of pages) {
        const data = new MemeData(page);
        data.avatar = this.avatarApi.dowloadAvatar(page.memetick.id);
        result.push(data);
      }

      this.next(result);
    });
  }

  private next(pages: MemeData[]) {
    this._data.next(pages);
    this._loading.next(false);
    this.query.page++;
  }

  public destroy() {
    this._data.unsubscribe();
    this._loading.unsubscribe();
    this._empty.unsubscribe();
  }
}


