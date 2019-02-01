export enum SecurityStatus {
  SUCCESSFUL = 'Успешная операция!',
  ERROR = 'Ошибка операции!',
  PASSWORD_WEAK = 'Слабый или неподходящий пароль',
  PASSWORD_REPEAT = 'Неверно подтвержден пароль',
  LOGIN_EXIST = 'Логин уже занят',
  EMAIL_EXIST = 'Почта уже испольлзуется',
  LOGIN_INVALID = 'Некорректный логин',
  EMAIL_INVALID = 'Некорректная почта',
  INVITE = 'Инвайт-код не действителен'
}
