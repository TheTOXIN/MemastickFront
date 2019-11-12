import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {OauthApiService} from '../../services/oauth-api-service';
import {UserData} from '../../model/UserData';

@Component({
  selector: 'app-user-data-modal',
  templateUrl: './user-data-modal.component.html',
  styleUrls: ['./user-data-modal.component.scss']
})
export class UserDataModalComponent implements OnInit {

  public data: UserData;

  isLoad = false;

  constructor(
    public activeModal: NgbActiveModal,
    public oauthApi: OauthApiService
  ) { }

  ngOnInit() {
    this.oauthApi.loadData().subscribe(data => {
      this.data = data;
      this.isLoad = true;
    })
  }
}
