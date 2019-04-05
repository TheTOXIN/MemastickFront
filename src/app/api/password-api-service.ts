import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API} from '../consts/API';

@Injectable()
export class PasswordApiService {

  constructor(
    private http: HttpClient
  ) {
  }

  public send(email: String) {
    return this.http
      .patch(
        API.PASSWORD_RESET_SEND,
        {
          'email': email
        }
      )
      .pipe();
  }

  public take(code: String, password: String, passwordRepeat: String) {
    return this.http
      .patch(
        API.PASSWORD_RESET_TAKE,
        {
          'code': code,
          'password': password,
          'passwordRepeat': passwordRepeat
        }
      )
      .pipe();
  }

}
