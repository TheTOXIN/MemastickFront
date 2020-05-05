import { Component, OnInit } from '@angular/core';
import {DonaterApiService} from '../../api/donater-api-service';
import {DonaterMessage} from '../../model/donaters/DonaterMessage';
import {DONAT} from '../../app.constants';

@Component({
  selector: 'app-donater-messages',
  templateUrl: './donater-messages.component.html',
  styleUrls: ['./donater-messages.component.scss']
})
export class DonaterMessagesComponent implements OnInit {

  public isLoad = false;
  public messages: DonaterMessage[] = [];

  ratingHref = '/donaters/rating';
  donatHref = DONAT;

  constructor(
    private donaterApi: DonaterApiService
  ) {

  }

  ngOnInit() {
    this.donaterApi.readMessages().subscribe(data => {
      this.messages = data;
      this.isLoad = true;
    });
  }

  toDonat() {
    window.open(this.donatHref, '_blank');
  }

  close() {
    window.history.back();
  }
}
