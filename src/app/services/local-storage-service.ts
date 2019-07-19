import {Injectable} from '@angular/core';
import {User} from '../model/User';

@Injectable()
export class LocalStorageService {

  private PUSH_ASK = 'PUSH_ASK';
  private ME = 'ME';

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
}
