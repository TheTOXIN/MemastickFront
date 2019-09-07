import {Injectable} from '@angular/core';
import {User} from '../model/User';
import {MemeFilter} from '../consts/MemeFilter';
import {RoleType} from '../consts/RoleType';

// LOCAL
const PUSH_ASK = 'PUSH_ASK';
const BATTLE_RULE = 'BATTLE_RULE';
const ME = 'ME';

// SESSION
const MEME_PAGE = 'MEME_PAGE_';
const HELLO = 'HELLO';

@Injectable()
export class StorageService {

  public getPushAsk(): boolean {
    const value = localStorage.getItem(PUSH_ASK);
    return value !== 'true';
  }

  public setPushAsk(value: boolean) {
    const str = value ? 'true' : 'false';
    localStorage.setItem(PUSH_ASK, str);
  }

  public getMe(): User {
    const value = localStorage.getItem(ME);
    return <User>JSON.parse(value);
  }

  public getRole() {
    const user = this.getMe();
    if (user != null) {
      return user.role;
    } else {
      return RoleType.USER;
    }
  }

  public setMe(me: User) {
    const value = JSON.stringify(me);
    localStorage.setItem(ME, value);
  }

  public getMemePage(filter: MemeFilter) {
    let page = +sessionStorage.getItem(MEME_PAGE + filter);
    if (page == null) { page = 0; }
    return page;
  }

  public setMemePage(filter: MemeFilter, page: number) {
    sessionStorage.setItem(MEME_PAGE + filter, page + '');
  }

  public remMemePage(filter: MemeFilter) {
    sessionStorage.removeItem(MEME_PAGE + filter);
  }

  public getHello(): string {
    return sessionStorage.getItem(HELLO);
  }

  public setHello(hello: string) {
    sessionStorage.setItem(HELLO, hello);
  }

  public battleRule(): boolean {
    if (!localStorage.getItem(BATTLE_RULE)) {
      localStorage.setItem(BATTLE_RULE, 'true');
      return true;
    } else {
      return false;
    }
  }

  public clearLogOut() {
    sessionStorage.clear();
    localStorage.removeItem(ME);
  }
}
