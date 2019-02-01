import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {MemetickApiService} from '../../services/memetick-api-service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-change-nick-modal',
  templateUrl: './change-nick-modal.component.html',
  styleUrls: ['./change-nick-modal.component.scss']
})
export class ChangeNickModalComponent implements OnInit {

  public nickForm: FormGroup;
  public message = 'Длина ника от 3 до 16 символов. Менять ник можно раз в неделю';

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
        Validators.minLength(3),
        Validators.maxLength(16)
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
