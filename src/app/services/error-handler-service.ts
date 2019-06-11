import {Injectable} from '@angular/core';
import {ErrorStatus} from '../consts/ErrorStatus';

@Injectable()
export class ErrorHandlerService {

  static tokenError(status: ErrorStatus) {
    if (status === ErrorStatus.LESS_TOKEN) {
      return 'Нужен токен!';
    } else if (status === ErrorStatus.TOKEN_SELF) {
      return 'Это ваш мем!';
    } else {
      return 'Ошибка применения токена!';
    }
  }
}
