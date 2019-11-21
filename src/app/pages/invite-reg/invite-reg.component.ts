import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {InviteApiService} from '../../api/invite-api-service';
import {ValidConst} from '../../consts/ValidConst';
import {ErrorCode} from '../../consts/ErrorCode';
import {Router} from '@angular/router';

@Component({
  selector: 'app-invite-reg',
  templateUrl: './invite-reg.component.html',
  styleUrls: ['./invite-reg.component.scss']
})
export class InviteRegComponent implements OnInit {

  public text: string;
  public load: boolean;

  contactForm: FormGroup;
  showFrom = true;

  constructor(
    private fb: FormBuilder,
    private service: InviteApiService,
    private router: Router
  ) {
    this.text = 'Введите вашу почту, чтобы мы отправили вам приглашение';
    this.load = false;
  }

  ngOnInit() {
    this.contactForm = this.fb.group({
      email: ['', Validators.email],
    });
  }

  onSubmit() {
    this.load = true;

    this.service.regInvite(
      this.contactForm.value.email,
    ).subscribe(() => {
      this.showFrom = false;
      this.load = false;
    }, (data) => {
      if (data.error.code === ErrorCode.TIME_IN) {
        this.text = 'Вы уже отправляли запрос, попробуйте позже';
      } else if (data.error.code === ErrorCode.EMAIL_NOT_SEND) {
        this.text = 'Не удалось отправить инвайт на почту';
      } else if (data.error.code === ErrorCode.EMAIL_INVALID) {
        this.text = 'Неверно введена почта!';
      } else {
        this.text = 'Ошибка, попробуйте в другой раз';
      }
      this.load = false;
    });
  }

  toReg() {
    this.router.navigateByUrl('/pages/sign-up');
  }
}
