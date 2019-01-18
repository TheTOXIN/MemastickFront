import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PasswordApiService} from '../../services/password-api-service';
import {OauthApiService} from '../../services/oauth-api-service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  private messages = [
    'Мы отправим тебе код для восстановления пароля',
    'Подтверди код восстановления ',
    'Введите новый пароль',
    'Постарайся больше не забывать пароли :)',
    'Говорят грецкие орехи улучшают память'
  ];

  public message: String;
  public error = false;
  public isLoading = false;
  public stepNumber = 0;

  public sendForm: FormGroup;
  public acceptForm: FormGroup;
  public changeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private reset: PasswordApiService,
    private oauth: OauthApiService
  ) {
    this.sendForm = new FormGroup({});
    this.acceptForm = new FormGroup({});
    this.changeForm = new FormGroup({});

    this.nextStep();
  }

  ngOnInit() {
    this.sendForm = this.fb.group({
      email: ['', Validators.email],
    });
    this.acceptForm = this.fb.group({
      code: ['', Validators.required],
    });
    this.changeForm = this.fb.group({
      password: ['', Validators.required],
      passwordRepeat: ['', Validators.required],
    });
  }

  onSend() {
    this.isLoading = true;
    this.reset.send(this.sendForm.value.email).subscribe(
      () => this.nextStep(),
      () => this.setError('Ошибка отправки сообщения')
    );
  }

  onAccept() {
    this.nextStep();
  }

  onChange() {
    this.isLoading = true;

    this.reset.take(
      this.acceptForm.value.code,
      this.changeForm.value.password,
      this.changeForm.value.passwordRepeat
    ).subscribe(
      () => this.nextStep(),
      error => this.setError(this.oauth.statuses[error.error])
    );
  }

  setError(error: String) {
    this.isLoading = false;
    this.error = true;
    this.message = error;
  }

  nextStep() {
    this.isLoading = false;
    this.error = false;
    this.stepNumber++;
    this.message = this.messages[this.stepNumber - 1];
  }

}
