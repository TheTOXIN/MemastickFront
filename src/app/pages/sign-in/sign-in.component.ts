import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OauthApiService} from '../../services/oauth-api-service';
import {Router} from '@angular/router';
import {ValidConst} from '../../consts/ValidConst';
import {AppComponent} from '../../app.component';
import {PushService} from '../../services/push-service';

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
    private app: AppComponent,
    private fb: FormBuilder,
    private oauth: OauthApiService,
    private router: Router,
    private push: PushService
  ) {
    this.signForm = new FormGroup({});
    this.message = this.messages[Math.floor(Math.random() * this.messages.length)];
  }

  ngOnInit() {
    if (this.oauth.checkTokens()) { this.toHome(); }
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
        () => this.setErrorMessage('Неверные данные для входа'),
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
    this.toHome();
    this.app.notify();
    this.push.register();
  }

  toHome() {
    this.router.navigateByUrl('/home');
  }
}
