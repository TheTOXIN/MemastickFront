import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegistrationApiService} from '../../api/registration-api-service';
import {Registration} from '../../model/Registration';
import {Router} from '@angular/router';
import {OauthApiService} from '../../services/oauth-api-service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  private messages = [
    'Милости прошу к нашему шалашу',
    'Быстрее возвращайся!',
    'Ну давай залезай сюда',
    'Где тебя носило? Мы волновались',
    'Вы только посмотрите кто пожаловал!'
  ];

  public message: String;
  public error = false;
  public isLoading = false;

  public signForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private reg: RegistrationApiService,
    private oauth: OauthApiService,
    private router: Router
  ) {
    this.signForm = new FormGroup({});
    this.message = this.messages[Math.floor(Math.random() * this.messages.length)];
  }

  ngOnInit() {
    this.signForm = this.fb.group({
      email: ['', Validators.email],
      invite: ['', Validators.required],

      login: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
      ])],

      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
      ])],

      passwordRepeat: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
      ])],

    });
  }

  onSubmit() {
    this.isLoading = true;
    this.reg.registration(
      new Registration(
        this.signForm.value.email,
        this.signForm.value.login,
        this.signForm.value.password,
        this.signForm.value.passwordRepeat,
        this.signForm.value.invite
      )
    ).subscribe(
      () => this.toLogin(),
      error => this.setError(error)
    );
  }

  toLogin() {
    this.oauth.login(
      this.signForm.value.password,
      this.signForm.value.login
    ).subscribe(
      () => this.router.navigateByUrl('/home'),
      () => this.router.navigateByUrl('/pages/sign-in'),
    );
  }

  setError(error: any) {
    this.error = true;
    this.isLoading = false;
    this.message = this.oauth.statuses[error.error];
  }
}
