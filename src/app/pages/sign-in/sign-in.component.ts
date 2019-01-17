import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OauthApiService} from '../../services/oauth-api-service';
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
    private router: Router,
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

    this.isLoading = true;

    let username = this.signForm.value.login;
    const password = this.signForm.value.password;

    if (username == null || username === '') {
      username = this.signForm.value.email;
    }

    this.oauth
      .login(username, password)
      .pipe()
      .subscribe(
        () => this.router.navigateByUrl('/home'),
        () => { this.setErrorMessage('Неверные данные для входа'); this.isLoading = false; },
      );
  }

  setErrorMessage(mes: String) {
    this.error = true;
    this.message = mes;
  }

}
