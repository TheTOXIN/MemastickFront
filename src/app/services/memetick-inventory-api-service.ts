import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API} from '../consts/API';
import {MemetickInventory} from '../model/MemetickInventory';

@Injectable()
export class MemetickInventoryApiService {

  constructor(
    private http: HttpClient
  ) {

  }

  public readAll() {
    return this.http
      .get<MemetickInventory>(API.INVENTORY_ALL)
      .pipe();
  }
}
