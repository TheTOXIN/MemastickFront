import { Component, OnInit } from '@angular/core';
import {AdminApiService} from '../../api/admin-api-service';
import {InviteCode} from '../../model/InviteCode';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public codes: InviteCode[] = [];

  constructor(
    public adminApi: AdminApiService
  ) {

  }

  ngOnInit() {
    this.readInvites();
  }

  readInvites() {
    this.adminApi.readInvites().subscribe(data => {
      this.codes = data;
      console.log(data);
    });
  }

  sendInvite(invite: InviteCode) {
    if (invite.take) return;
    this.adminApi.sendInvite(
      invite.code
    );
  }
}
