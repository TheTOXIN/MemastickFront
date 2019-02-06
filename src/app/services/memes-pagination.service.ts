import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/take';
import {AngularFirestore} from '@angular/fire/firestore';
import {MemeApiService} from './meme-api-service';
import {MemeData} from '../model/MemeData';
import {MemeLikeApiService} from './meme-like-api-service';
import {MemetickApiService} from './memetick-api-service';
import {MemetickAvatarApiService} from './memetick-avatar-api-service';

interface QueryConfig {
  page: number;
  size: number;
  sort: string;
  reverse: boolean;
}

@Injectable()
export class MemesPaginationService {

  private query: QueryConfig;

  private _loading;
  private _data;

  public loading: Observable<boolean>;
  public data: Observable<MemeData[]>;

  constructor(
    private afs: AngularFirestore,
    private memeApi: MemeApiService,
    private avatarApi: MemetickAvatarApiService,
  ) {

  }

  init(sizePage, sortFiled, isReverse) {
    this.query = {
      page: 0,
      size: sizePage,
      sort: sortFiled,
      reverse: isReverse,
    };

    if (this.query.reverse) {
      this.query.sort += ',desc';
    }

    this.query.size = sizePage;

    this._loading = new BehaviorSubject(false);
    this._data = new BehaviorSubject([]);

    this.loading = this._loading.asObservable();
    this.data = this._data.asObservable().scan((acc, val) => {
      return acc.concat(val);
    });

    this.more();
  }

  public more() {
    if (this._loading.value) { return; }
    this._loading.next(true);

    this.memeApi.memePage(
      this.query.page,
      this.query.size,
      this.query.sort
    ).subscribe((pages) => {
      if (pages.length === 0 || pages == null) { this._loading.next(false); }

      const result: MemeData[] = [];

      for (const page of pages) {
        const data = new MemeData(page);

        data.avatar = this.avatarApi.dowloadAvatar(page.memetick.id);
        this.memeApi.memeRead(page.meme.url).then(meme => {
          data.page.meme.url = meme.data().url;
        });

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
  }

}


