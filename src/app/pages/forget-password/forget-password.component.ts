import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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
  ];

  public message: String;
  public error = false;
  public stepNumber = 0;

  public sendForm: FormGroup;
  public acceptForm: FormGroup;
  public changeForm: FormGroup;

  constructor(
    private fb: FormBuilder
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
    console.log(this.sendForm.value.email);
    this.nextStep();
  }

  onAccept() {
    console.log(this.acceptForm.value.code);
    this.nextStep();
  }

  onChange() {
    console.log(this.changeForm.value.password, this.changeForm.value.passwordRepeat);
    this.nextStep();
  }

  nextStep() {
    this.stepNumber++;
    this.message = this.messages[this.stepNumber - 1];
  }

}
