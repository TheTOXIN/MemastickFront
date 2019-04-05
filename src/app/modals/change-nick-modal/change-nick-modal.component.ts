import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {MemetickApiService} from '../../api/memetick-api-service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidConst} from '../../consts/ValidConst';

@Component({
  selector: 'app-change-nick-modal',
  templateUrl: './change-nick-modal.component.html',
  styleUrls: ['./change-nick-modal.component.scss']
})
export class ChangeNickModalComponent implements OnInit {

  public nickForm: FormGroup;
  public message = 'Длина ника от 3 до 16 символов. Менять ник можно раз в неделю';

  @Input()
  public nick = '';

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    public memetickApi: MemetickApiService,
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
    this.memetickApi.changeNick(this.nickForm.value.nick).subscribe(
      () => {
        this.activeModal.dismiss('Cross click');
        window.location.reload();
      },
      () => {
        this.message = 'Вы уже меняли ник на этой неделе';
      }
    );
  }

}
