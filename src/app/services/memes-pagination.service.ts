import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/take';
import {MemeApiService} from '../api/meme-api-service';
import {MemeData} from '../model/MemeData';
import {MemetickAvatarApiService} from '../api/memetick-avatar-api-service';
import {GlobalConst} from '../consts/GlobalConst';
import {StorageService} from './storage-service';
import {MemePaginationConfig} from '../iface/MemePaginationConfig';


@Injectable()
export class MemesPaginationService {

  private config: MemePaginationConfig;

  private _empty;
  private _loading;
  private _data;

  public empty: Observable<boolean>;
  public loading: Observable<boolean>;
  public data: Observable<MemeData[]>;

  constructor(
    private memeApi: MemeApiService,
    private avatarApi: MemetickAvatarApiService,
    private storage: StorageService
  ) {

  }

  init(sizePage, sortFiled, isReverse, filter, step, memetick) {
    const page = this.storage.getMemePage(filter);

    this.config = {
      page: page,
      size: sizePage,
      sort: sortFiled,
      reverse: isReverse,
      filter: filter,
      step: step,
      memetick: memetick
    };

    if (this.config.reverse) {
      this.config.sort += ',desc';
    }

    this.config.size = sizePage;

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

    this.memeApi.memePages(this.config).subscribe((pages) => {
      if (pages.length === 0 || pages == null) {
        this.end();
        return;
      }

      if (pages.length < GlobalConst.MEME_BATCH) {
        this.end();
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
    this.storage.setMemePage(this.config.filter, this.config.page);
    this._data.next(pages);
    this._loading.next(false);
    this.config.page++;
  }

  public destroy() {
    this._data.unsubscribe();
    this._loading.unsubscribe();
    this._empty.unsubscribe();
  }

  public end() {
    this._loading.next(false);
    this._empty.next(true);
  }
}


