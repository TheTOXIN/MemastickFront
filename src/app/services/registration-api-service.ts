import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Registration} from '../model/Registration';
import {API} from '../consts/API';

@Injectable()
export class RegistrationApiService {

  constructor(
    private http: HttpClient
  ) {
  }

  public registration(reg: Registration) {
    return this.http
      .post(API.REGISTRATION, reg)
      .pipe();
  }

}
