export enum SecurityStatus {
  SUCCESSFUL = 'SUCCESSFUL',
  ERROR = 'ERROR',
  PASSWORD_INVALID = 'PASSWORD_INVALID',
  PASSWORD_REPEAT = 'PASSWORD_REPEAT',
  LOGIN_EXIST = 'LOGIN_EXIST',
  LOGIN_INVALID = 'LOGIN_INVALID',
  INVITE = 'INVITE'
}

export const securityStatuses = [];

securityStatuses[SecurityStatus.SUCCESSFUL] = 'Успешная операция!';
securityStatuses[SecurityStatus.ERROR] = 'Ошибка операции!';
securityStatuses[SecurityStatus.PASSWORD_INVALID] = 'Некорректный пароль';
securityStatuses[SecurityStatus.PASSWORD_REPEAT] = 'Неверно подтвержден пароль';
securityStatuses[SecurityStatus.LOGIN_EXIST] = 'Логин уже занят';
securityStatuses[SecurityStatus.LOGIN_INVALID] = 'Некорректный логин';
securityStatuses[SecurityStatus.INVITE] = 'Инвайт-код не действителен';



