import { Component, OnInit } from '@angular/core';
import {DonaterApiService} from '../../api/donater-api-service';
import {DonaterMessage} from '../../model/donaters/DonaterMessage';
import {DONAT} from '../../app.constants';
import {Router} from '@angular/router';

@Component({
  selector: 'app-donater-messages',
  templateUrl: './donater-messages.component.html',
  styleUrls: ['./donater-messages.component.scss']
})
export class DonaterMessagesComponent implements OnInit {

  public messages: DonaterMessage[] = [];

  isLoad = false;
  donatHref = DONAT;

  constructor(
    private router: Router,
    private donaterApi: DonaterApiService
  ) {

  }

  ngOnInit() {
    this.donaterApi.readMessages().subscribe(data => {
      this.messages = data;
      this.isLoad = true;
    });
  }

  toRate() {
    this.router.navigateByUrl('/donaters/rating');
  }

  toDonat() {
    window.open(this.donatHref, '_blank');
  }

  close() {
    this.router.navigateByUrl('/home');
  }
}
