import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/take';
import {AngularFirestore} from '@angular/fire/firestore';
import {MemeApiService} from './meme-api-service';
import {MemePage} from '../model/MemePage';
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

  private _loading = new BehaviorSubject(false);
  private _data = new BehaviorSubject([]);

  public loading: Observable<boolean> = this._loading.asObservable();
  public data: Observable<MemePage[]>;

  public pages: MemePage[] = [];

  constructor(
    private afs: AngularFirestore,
    private memeApi: MemeApiService,
    private memetickApi: MemetickApiService,
    private avatarApi: MemetickAvatarApiService,
    private likeApi: MemeLikeApiService
  ) {

  }

  init(sizePage, sizeInit, sortFiled, isReverse) {
    this.query = {
      page: 0,
      size: sizeInit,
      sort: sortFiled,
      reverse: isReverse,
    };

    if (this.query.reverse) {
      this.query.sort += ',desc';
    }

    this.more();
    this.query.size = sizePage;
    this.data = this._data.asObservable().scan((acc, val) => {
      return acc.concat(val);
    });
  }

  public more() {
    if (this._loading.value) {return;}
    this._loading.next(true);

    this.memeApi.memePage(
      this.query.page,
      this.query.size,
      this.query.sort
    ).subscribe((memes) => {
      if (memes.length === 0 || memes == null) {
        this.query.page = -1;
        this.next();
      }
      for (const meme of memes) {
        const page: MemePage = new MemePage(meme.id);
        this.memetickApi.preview(meme.memetickId).subscribe((memetick) => {
          page.memetick = memetick;
          page.avatar = this.avatarApi.dowloadAvatar(meme.memetickId);
          this.likeApi.read(meme.id).subscribe((like) => {
            page.like = like;
            page.image = 'TMP'; // TODO test
            this.pages.push(page);
            this.next();
          });
        });
      }
    });
  }

  private next() {
    this._data.next(this.pages);
    this._loading.next(false);
    this.query.page++;
    this.pages = [];
  }

}


