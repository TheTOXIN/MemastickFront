import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API} from '../consts/API';
import {MemetickInventory} from '../model/MemetickInventory';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MemetickInventoryApiService {

  constructor(
    private http: HttpClient
  ) {

  }

  public stateCell(): Observable<any> {
    return this.http
      .get<any>(API.INVENTORY_CELL)
      .pipe();
  }

  public readAll() {
    return this.http
      .get<MemetickInventory>(API.INVENTORY_ALL)
      .pipe();
  }
}
