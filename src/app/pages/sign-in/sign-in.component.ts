import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OauthApiService} from '../../services/oauth-api-service';
import {ValidConst} from '../../consts/ValidConst';
import {FRONT_URL} from '../../app.constants';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  private messages = [
    'Мы уже соскучились по тебе :)',
    'Быстрее возвращайся!',
    'Ну давай залезай сюда',
    'Где тебя носило? Мы волновались',
    'Вы только посмотрите кто пожаловал!'
  ];

  public message: String;
  public error = false;

  public signForm: FormGroup;
  public signType: String = 'login';

  public isLoading = false;

  constructor(
    private fb: FormBuilder,
    private oauth: OauthApiService,
    private router: Router
  ) {
    this.signForm = new FormGroup({});
    this.message = this.messages[Math.floor(Math.random() * this.messages.length)];
  }

  ngOnInit() {
    if (this.oauth.checkTokens()) {
      this.router.navigateByUrl('/home');
    }
    
    this.signForm = this.fb.group({
      password: ['', Validators.required],
      email: [],
      login: [],
    });
  }

  onSubmit() {
    this.isLoading = true;

    if (!this.onValid()) { return; }

    let username = this.signForm.value.login;
    const password = this.signForm.value.password;

    if (username == null || username === '') {
      username = this.signForm.value.email;
    }

    this.oauth
      .login(username, password)
      .pipe()
      .subscribe(
        () => this.login(),
        (data) => this.invalid(data.error),
      );
  }

  setErrorMessage(mes: String) {
    this.error = true;
    this.message = mes;
    this.isLoading = false;
  }

  onValid(): boolean {
    if (
      (this.signForm.value.email == null || this.signForm.value.email === '') &&
      (this.signForm.value.login == null || this.signForm.value.login === '')
    ) {
      this.setErrorMessage('Введите логин или почту!');
      return false;
    }

    if (
      (this.signForm.value.password != null && this.signForm.value.password.length > ValidConst.MAX_TXT) ||
      (this.signForm.value.login != null && this.signForm.value.login.length > ValidConst.MAX_TXT)
    ) {
      this.setErrorMessage('Некорректные данные');
      return false;
    }

    return true;
  }

  login() {
    window.location.href = FRONT_URL + '/home';
  }

  invalid(error: any) {
    if (error.error_description === 'User account is locked') {
      this.setErrorMessage('ВАШ АККАУНТ ЗАБАНЕН!');
    } else {
      this.setErrorMessage('Неверные данные для входа');
    }
  }
}
