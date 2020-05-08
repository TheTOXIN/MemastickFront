import { Component, OnInit } from '@angular/core';
import {InviteCode} from '../../model/InviteCode';
import {InviteApiService} from '../../api/invite-api-service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AdminApiService} from '../../api/admin-api-service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public codes: InviteCode[] = [];

  public mesgNotifyForm: FormGroup;
  public suprNotifyForm: FormGroup;
  public userNotifyForm: FormGroup;

  isAlert = false;
  msgAlert = 'TEST';
  typeAlert = 'primary';

  constructor(
    public inviteApi: InviteApiService,
    public adminApi: AdminApiService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {

  }

  ngOnInit() {
    this.readInvites();

    this.mesgNotifyForm = this.formBuilder.group({
      text: ['', Validators.required],
      days: ['', Validators.required]
    });

    this.suprNotifyForm = this.formBuilder.group({
      text: ['', Validators.required],
    });

    this.userNotifyForm = this.formBuilder.group({
      text: ['', Validators.required],
      uuid: ['', Validators.required],
    });
  }

  readInvites() {
    this.inviteApi.readInvites().subscribe(data => {
      this.codes = data;
    });
  }

  sendInvite(invite: InviteCode) {
    if (invite.take) { return; }
    this.processRequest(
      this.inviteApi.sendInvite(invite.code)
  );
  }

  sendNotifyMesg() {
    const text = this.mesgNotifyForm.value.text;
    const days = this.mesgNotifyForm.value.days;

    this.processRequest(
      this.adminApi.notifyMessage(text, days)
    );

    this.mesgNotifyForm.reset();
  }

  sendNotifyPush() {
    const text = this.suprNotifyForm.value.text;

    this.processRequest(
      this.adminApi.notifyAll(text)
    );

    this.suprNotifyForm.reset();
  }

  sendNotifyUser() {
    const text = this.userNotifyForm.value.text;
    const uuid = this.userNotifyForm.value.uuid;

    this.processRequest(
      this.adminApi.notifyUser(text, uuid)
    );

    this.userNotifyForm.reset();
  }

  processRequest(request: Observable<any>) {
    request.subscribe(() => {
      this.showSuccessAlert();
    }, () => {
      this.showErrorAlert();
    });
  }

  toMemeticks() {
    this.router.navigateByUrl('/home/memetick/list');
  }

  closeAlert() {
    this.isAlert = false;
  }

  private showSuccessAlert() {
    this.msgAlert = 'SUCCESS';
    this.typeAlert = 'success';
    this.isAlert = true;
  }

  private showErrorAlert() {
    this.msgAlert = 'ERROR';
    this.typeAlert = 'danger';
    this.isAlert = true;
  }
}
