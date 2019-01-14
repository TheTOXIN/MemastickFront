import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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
      this.signForm.value.email == null || this.signForm.value.email === '' &&
      this.signForm.value.password == null || this.signForm.value.password === ''
    ) {
      this.error = true;
      this.message = 'Введите логин или почту!';
    }

    console.log(
      this.signForm.value.login,
      this.signForm.value.email,
      this.signForm.value.password
    );
  }

}
