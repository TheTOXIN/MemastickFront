import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {InviteApiService} from '../../api/invite-api-service';
import {ValidConst} from '../../consts/ValidConst';

@Component({
  selector: 'app-invite-reg',
  templateUrl: './invite-reg.component.html',
  styleUrls: ['./invite-reg.component.scss']
})
export class InviteRegComponent implements OnInit {

  public text = 'Длина ника от 3 до 16 символов';

  contactForm: FormGroup;
  showFrom = true;

  constructor(
    private fb: FormBuilder,
    private service: InviteApiService,
  ) {
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
    this.service.regInvite(
      this.contactForm.value.email,
      this.contactForm.value.nick
    ).subscribe(() => {
      this.showFrom = false;
    }, () => {
      this.text = 'Ошибка отправки, попробуйте позже';
    });
  }
}
