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
    this.text = 'Длина ника от 3 до 16 символов';
    this.load = false;
  }

  ngOnInit() {
    this.contactForm = this.fb.group({
      nick: ['', Validators.compose([
        Validators.required,
        Validators.minLength(ValidConst.MIN_LEN_NCK),
        Validators.maxLength(ValidConst.MAX_LEN_NCK)
      ])],
      email: ['', Validators.email],
    });
  }

  onSubmit() {
    this.load = true;

    this.service.regInvite(
      this.contactForm.value.email,
      this.contactForm.value.nick
    ).subscribe(() => {
      this.showFrom = false;
      this.load = false;
    }, (data) => {
      if (data.error.code === ErrorCode.TIME_IN) {
        this.text = 'Вы уже отправляли запрос, попробуйте позже';
      } else if (data.error.code === ErrorCode.EMAIL_NOT_SEND) {
        this.text = 'Не удалось отправить инвайт на почту';
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
