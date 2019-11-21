import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegistrationApiService} from '../../api/registration-api-service';
import {Registration} from '../../model/Registration';
import {ActivatedRoute, Router} from '@angular/router';
import {OauthApiService} from '../../services/oauth-api-service';
import {MemeFilter} from '../../consts/MemeFilter';
import {securityStatuses} from '../../consts/SecurityStatus';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  private messages = [
    'Милости прошу к нашему шалашу',
    'Тебе у нас понравится :)',
    'Ты сделал правильный выбор ;)',
    'Тебя ждет большое будущее!',
    'Где тебя носит? Быстрее к нам!'
  ];

  public invite: string;
  public message: string;

  public error = false;
  public isLoading = false;

  public signForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private reg: RegistrationApiService,
    private oauth: OauthApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.signForm = new FormGroup({});
    this.message = this.messages[Math.floor(Math.random() * this.messages.length)];
  }

  ngOnInit() {
    this.signForm = this.fb.group({
      invite: ['', Validators.required],
      login: ['', Validators.required],
      password: ['', Validators.required],
      passwordRepeat: ['', Validators.required],
    });

    this.route.queryParams.subscribe(params => {
      this.invite = params.invite;
      if (this.invite != null) {
        this.signForm.controls['invite'].setValue(this.invite);
        this.signForm.controls['invite'].disable();
      }
    });
  }

  onSubmit() {
    this.isLoading = true;
    this.signForm.controls['invite'].enable();

    this.reg.registration(
      new Registration(
        this.signForm.value.invite,
        this.signForm.value.login,
        this.signForm.value.password,
        this.signForm.value.passwordRepeat,
      )
    ).subscribe(
      () => this.toLogin(),
      error => this.setError(error)
    );
  }

  toLogin() {
    this.oauth.login(
      this.signForm.value.login,
      this.signForm.value.password
    ).subscribe(
      () => this.router.navigateByUrl('/home?modal=STARTER'),
      () => this.router.navigateByUrl('/pages/sign-in'),
    );
  }

  setError(error: any) {
    this.error = true;
    this.isLoading = false;
    this.message = securityStatuses[error.error];
    if (this.message == null) { this.message = 'Ошибка регистрации'; }
  }
}
