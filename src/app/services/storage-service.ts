import {Injectable} from '@angular/core';
import {User} from '../model/User';
import {MemeFilter} from '../consts/MemeFilter';

@Injectable()
export class StorageService {

  private PUSH_ASK = 'PUSH_ASK';
  private ME = 'ME';
  private MEME_PAGE = 'MEME_PAGE_';

  public getPushAsk(): boolean {
    const value = localStorage.getItem(this.PUSH_ASK);
    return value !== 'true';
  }

  public setPushAsk(value: boolean) {
    const str = value ? 'true' : 'false';
    localStorage.setItem(this.PUSH_ASK, str);
  }

  public getMe(): User {
    const value = localStorage.getItem(this.ME);
    return <User>JSON.parse(value);
  }

  public setMe(me: User) {
    const value = JSON.stringify(me);
    localStorage.setItem(this.ME, value);
  }

  public clearAll() {
    localStorage.clear();
  }

  public getMemePage(filter: MemeFilter) {
    let page = +sessionStorage.getItem(this.MEME_PAGE + filter);
    if (page == null) { page = 0; }
    return page;
  }

  public setMemePage(filter: MemeFilter, page: number) {
    sessionStorage.setItem(this.MEME_PAGE + filter, page + '');
  }

  public remMemePage(filter: MemeFilter) {
    sessionStorage.removeItem(this.MEME_PAGE + filter);
  }
}
