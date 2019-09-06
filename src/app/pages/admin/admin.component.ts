import { Component, OnInit } from '@angular/core';
import {InviteCode} from '../../model/InviteCode';
import {InviteApiService} from '../../api/invite-api-service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public codes: InviteCode[] = [];

  constructor(
    public inviteApi: InviteApiService
  ) {

  }

  ngOnInit() {
    this.readInvites();
  }

  readInvites() {
    this.inviteApi.readInvites().subscribe(data => {
      this.codes = data;
      console.log(data);
    });
  }

  sendInvite(invite: InviteCode) {
    if (invite.take) return;
    this.inviteApi.sendInvite(
      invite.code
    );
  }
}
