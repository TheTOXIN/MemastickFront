import { Component, OnInit } from '@angular/core';
import {DonateApiService} from '../../api/donate-api-service';
import {DONAT} from '../../app.constants';
import {Router} from '@angular/router';
import {DonateMessage} from '../model/DonateMessage';

@Component({
  selector: 'app-donate-messages',
  templateUrl: './donate-messages.component.html',
  styleUrls: ['./donate-messages.component.scss']
})
export class DonateMessagesComponent implements OnInit {

  public messages: DonateMessage[] = [];

  isLoad = false;
  donatHref = DONAT;

  constructor(
    private router: Router,
    private donateApi: DonateApiService
  ) {

  }

  ngOnInit() {
    this.donateApi.readMessages().subscribe(data => {
      this.messages = data;
      this.isLoad = true;
    });
  }

  toRate() {
    this.router.navigateByUrl('/donate');
  }

  toDonat() {
    window.open(this.donatHref, '_blank');
  }

  close() {
    this.router.navigateByUrl('/home');
  }
}
