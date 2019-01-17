import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OAuthService} from 'angular-oauth2-oidc';
import {OauthApiService} from '../../services/oauth-api-service';

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

  constructor(
    private fb: FormBuilder,
    private oauth: OauthApiService,
  ) {
    this.signForm = new FormGroup({});
    this.message = this.messages[Math.floor(Math.random() * this.messages.length)];
  }

  ngOnInit() {
    this.signForm = this.fb.group({
      password: ['', Validators.required],
      email: [],
      login: [],
    });
  }

  onSubmit() {
    if (
      (this.signForm.value.email == null || this.signForm.value.email === '') &&
      (this.signForm.value.login == null || this.signForm.value.login === '')
    ) {
      this.setErrorMessage('Введите логин или почту!');
      return;
    }

    let username = this.signForm.value.login;
    const password = this.signForm.value.password;

    if (username == null || username === '') {
      username = this.signForm.value.email;
    }

    const isLogin = this.oauth.login(username, password);

    if (!isLogin) {
      this.setErrorMessage('Неверные данные для входа');
    }
  }

  setErrorMessage(mes: String) {
    this.error = true;
    this.message = mes;
  }

}
