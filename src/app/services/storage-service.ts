import {Injectable} from '@angular/core';
import {User} from '../model/User';
import {MemeFilter} from '../consts/MemeFilter';
import {RoleType} from '../consts/RoleType';
import {GlobalConst} from '../consts/GlobalConst';
import {DonaterMessage} from '../model/donaters/DonaterMessage';

// LOCAL
const PUSH_ASK = 'PUSH_ASK';
const BATTLE_RULE = 'BATTLE_RULE';
const START_INFO = 'START_INFO';
const EVOLVE_INFO = 'EVOLVE_INFO';
const CREATE_INFO = 'CREATE_INFO';
const ME = 'ME';
const PUSH_TOKEN = 'PUSH_TOKEN';

// SESSION
const MEME_PAGE = 'MEME_PAGE_';
const DONATER_MESSAGE = 'DONATER_MESSAGE';
const TWA = 'TWA';
const PEVIEW = 'PEVIEW';
const LAB_MEM = 'LAB_MEM';
const HOME_MSG = 'HOME_MSG';

@Injectable()
export class StorageService {

  public setHomeMessage(msg: string) {
    sessionStorage.setItem(HOME_MSG, msg);
  }

  public getHomeMessage() {
    return sessionStorage.getItem(HOME_MSG);
  }

  public getPushAsk(): boolean {
    let value: number = +localStorage.getItem(PUSH_ASK);

    if (value >= GlobalConst.PUSH_ASK_COUNT) { return false; }
    if (value == null) { value = 0; }

    value++;
    localStorage.setItem(PUSH_ASK, value + '');

    return value === GlobalConst.PUSH_ASK_COUNT;
  }

  public setPushAsk() {
    localStorage.setItem(
      PUSH_ASK,
      GlobalConst.PUSH_ASK_COUNT + ''
    );
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

  public getDonaterMessage(): DonaterMessage {
    const value = sessionStorage.getItem(DONATER_MESSAGE);
    return value == null ? null : <DonaterMessage>JSON.parse(value);
  }

  public setDonaterMessage(data: DonaterMessage) {
    const value = JSON.stringify(data);
    sessionStorage.setItem(DONATER_MESSAGE, value);
  }

  public battleRule(): boolean {
    return this.checkerItem(BATTLE_RULE);
  }

  public showEvolveInfo() {
    return this.checkerItem(EVOLVE_INFO);
  }

  public showCreateInfo() {
    return this.checkerItem(CREATE_INFO);
  }

  public showStartInfo(): boolean {
    return this.checkerItem(START_INFO);
  }

  private checkerItem(key: string): boolean {
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, 'true');
      return true;
    } else {
      return false;
    }
  }

  public asTWA() {
    return sessionStorage.setItem(TWA, TWA);
  }

  public isTWA() {
    return sessionStorage.getItem(TWA) === TWA;
  }

  public isPreview(): boolean {
    const wasPreview = sessionStorage.getItem(PEVIEW) === PEVIEW;

    if (!wasPreview) {
      sessionStorage.setItem(PEVIEW, PEVIEW);
    }

    return !wasPreview;
  }

  public saveLabMeme(meme: any) {
    sessionStorage.setItem(LAB_MEM, meme);
  }

  public loadLabMeme(): any {
    return sessionStorage.getItem(LAB_MEM);
  }

  public setPushToken(token: any) {
    localStorage.setItem(PUSH_TOKEN, token);
  }

  public getPushToken(): any {
    return localStorage.getItem(PUSH_TOKEN);
  }

  public clearLogOut() {
    localStorage.removeItem(ME);
  }
}
