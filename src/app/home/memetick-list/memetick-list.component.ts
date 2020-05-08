import { Component, OnInit } from '@angular/core';
import {MemetickApiService} from '../../api/memetick-api-service';
import {MemetickPreview} from '../../model/MemetickPreview';

@Component({
  selector: 'app-memetick-list',
  templateUrl: './memetick-list.component.html',
  styleUrls: ['./memetick-list.component.scss']
})
export class MemetickListComponent implements OnInit {

  public memeticks: MemetickPreview[] = [];
  public isLoad = false;

  constructor(
    private memetickApi: MemetickApiService
  ) {

  }

  ngOnInit() {
    this.memetickApi.list().subscribe(data => {
      this.memeticks = data;
      this.isLoad = true;
    });
  }
}
