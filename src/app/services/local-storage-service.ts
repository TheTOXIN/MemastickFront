import {Injectable} from '@angular/core';

@Injectable()
export class LocalStorageService {

  private PUSH_ASK = 'PUSH_ASK';

  public getPushAsk(): boolean {
    const value = localStorage.getItem(this.PUSH_ASK);
    return value !== 'true';
  }

  public setPushAsk(value: boolean) {
    const str = value ? 'true' : 'false';
    localStorage.setItem(this.PUSH_ASK, str);
  }
}
