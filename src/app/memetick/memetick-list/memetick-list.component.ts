import {Component, Input, OnInit} from '@angular/core';
import {MemetickApiService} from '../../api/memetick-api-service';
import {MemetickPreview} from '../../model/MemetickPreview';
import {UUID} from 'angular2-uuid';

@Component({
  selector: 'app-memetick-list',
  templateUrl: './memetick-list.component.html',
  styleUrls: ['./memetick-list.component.scss']
})
export class MemetickListComponent implements OnInit {

  @Input()
  public memetickIds: UUID[] = [];

  @Input()
  public memeticks: MemetickPreview[];

  public isLoad = false;

  constructor(
    private memetickApi: MemetickApiService
  ) {

  }

  ngOnInit() {
    if (this.memeticks == null) {
      this.memetickApi.list(this.memetickIds).subscribe(data => {
        this.memeticks = data;
        this.isLoad = true;
      });
    } else {
      this.isLoad = true;
    }
  }
}
