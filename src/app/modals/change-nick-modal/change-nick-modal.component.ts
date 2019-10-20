import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {MemetickApiService} from '../../api/memetick-api-service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidConst} from '../../consts/ValidConst';
import {Router} from '@angular/router';
import {ErrorCode} from '../../consts/ErrorCode';

@Component({
  selector: 'app-change-nick-modal',
  templateUrl: './change-nick-modal.component.html',
  styleUrls: ['./change-nick-modal.component.scss']
})
export class ChangeNickModalComponent implements OnInit {

  public nickForm: FormGroup;
  public message = 'Длина от 3 до 16 символов. Менять никнейм можно раз в месяц';

  @Input()
  public nick = '';

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    public memetickApi: MemetickApiService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.nickForm = this.fb.group({
      nick: ['', Validators.compose([
        Validators.required,
        Validators.minLength(ValidConst.MIN_LEN_NCK),
        Validators.maxLength(ValidConst.MAX_LEN_NCK)
      ])],
    });
  }

  changeNick() {
    this.memetickApi.changeNick(
      this.nickForm.value.nick,
      false
    ).subscribe(
      () => {
        this.activeModal.dismiss('Cross click');
        this.router.navigateByUrl('/home/memetick/me');
      },
      (data) => {
        if (data.error.code === ErrorCode.EXPIRE_NICK) {
          this.message = 'Вы уже меняли в этом месяце';
        } else if (data.error.code === ErrorCode.INVALID_NICK) {
          this.message = 'Неверная длина ника';
        } else if (data.error.code === ErrorCode.EXIST_NICK) {
          this.message = 'Такой ник уже занят';
        } else {
          this.message = 'Ошибка смены ника';
        }
      }
    );
  }
}
