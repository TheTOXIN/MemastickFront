import { Component, OnInit } from '@angular/core';
import {DonateApiService} from '../../api/donate-api-service';
import {DonateMessage} from '../model/DonateMessage';

@Component({
  selector: 'app-donate-messages',
  templateUrl: './donate-messages.component.html',
  styleUrls: ['./donate-messages.component.scss']
})
export class DonateMessagesComponent implements OnInit {

  public messages: DonateMessage[] = [];
  public isLoad = false;

  constructor(
    private donateApi: DonateApiService
  ) {

  }

  ngOnInit() {
    this.donateApi.readMessages().subscribe(data => {
      this.messages = data;
      this.isLoad = true;
    });
  }
}
