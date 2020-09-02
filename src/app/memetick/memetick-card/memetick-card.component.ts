import {Component, Input, OnInit} from '@angular/core';
import {UUID} from 'angular2-uuid';
import {MemetickApiService} from '../../api/memetick-api-service';
import {Memetick} from '../../model/Memetick';
import {BottomSheetOptions} from '../../options/bottom-sheet-options';

@Component({
  selector: 'app-memetick-card',
  templateUrl: './memetick-card.component.html',
  styleUrls: ['./memetick-card.component.scss']
})
export class MemetickCardComponent implements OnInit {

  @Input()
  public options: BottomSheetOptions;

  memetick: Memetick;
  isLoad = false;

  constructor(
    private memetickApi: MemetickApiService
  ) {

  }

  ngOnInit() {
    this.memetickApi.view(this.options.memetickId).subscribe(data => {
      this.memetick = data;
      this.isLoad = true;
    });
  }
}
