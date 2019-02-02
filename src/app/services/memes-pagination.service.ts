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

  constructor(
    private afs: AngularFirestore,
    private memeApi: MemeApiService,
    private memetickApi: MemetickApiService,
    private avatarApi: MemetickAvatarApiService,
    private likeApi: MemeLikeApiService
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
    this.data = this._data.asObservable().scan((acc, val) => {
      return acc.concat(val);
    });

    this.more();
  }

  public more() {
    if (this._loading.value) {return;}
    this._loading.next(true);
    this.memeApi.memePage(
      this.query.page,
      this.query.size,
      this.query.sort
    ).subscribe((memes) => {
      if (memes.length === 0 || memes == null) this._loading.next(false);
      const pages: MemePage[] = [];
      for (const meme of memes) {
        const page: MemePage = new MemePage(meme.id);
        pages.push(page);
        this.memeApi.memeRead(meme.fireId).then(data => {
          page.image = data.data().url;
          this.memetickApi.preview(meme.memetickId).subscribe((memetick) => {
            page.memetick = memetick;
            page.avatar = this.avatarApi.dowloadAvatar(meme.memetickId);
            this.likeApi.read(meme.id).subscribe((like) => {
              page.like = like;
            });
          });
        });
      }
      this.next(pages);
    });
  }

  private next(pages: MemePage[]) {
    this._data.next(pages);
    this._loading.next(false);
    this.query.page++;
  }

}


