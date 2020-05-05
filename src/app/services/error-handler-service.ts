import {Injectable} from '@angular/core';
import {ErrorCode} from '../consts/ErrorCode';

@Injectable()
export class ErrorHandlerService {

  static tokenError(status: ErrorCode) {
    if (status === ErrorCode.LESS_TOKEN) {
      return 'Нужен токен!';
    } else if (status === ErrorCode.TOKEN_SELF) {
      return 'Это ваш мем!';
    } else {
      return 'Ошибка токена!';
    }
  }
}
