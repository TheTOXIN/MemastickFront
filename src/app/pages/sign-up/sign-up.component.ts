import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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

  public signForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.signForm = new FormGroup({});
    this.message = this.messages[Math.floor(Math.random() * this.messages.length)];
  }

  ngOnInit() {
    this.signForm = this.fb.group({
      password: ['', Validators.required],
      passwordRepeat: ['', Validators.required],
      email: ['', Validators.required],
      login: ['', Validators.required],
      invite: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log(
      this.signForm.value.login,
      this.signForm.value.email,
      this.signForm.value.password,
      this.signForm.value.passwordRepeat,
      this.signForm.value.invite,
    );
  }

}
