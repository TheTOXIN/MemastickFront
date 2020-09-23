import { Component, OnInit } from '@angular/core';
import {DonateApiService} from '../api/donate-api-service';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss']
})
export class DonateComponent implements OnInit {

  constructor(
    private donateApi: DonateApiService
  ) {

  }

  ngOnInit() {
    this.donateApi.read().subscribe(data => {
      console.log(data);
    });
  }
}
