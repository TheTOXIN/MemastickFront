import {Component, Input, OnInit} from '@angular/core';
import {timer} from 'rxjs';
import {ScreenUtils} from '../../utils/screen-utils';

@Component({
  selector: 'app-preview-screen',
  templateUrl: './preview-screen.component.html',
  styleUrls: ['./preview-screen.component.scss']
})
export class PreviewScreenComponent implements OnInit {

  @Input()
  public text: string;

  @Input()
  public hide: boolean;

  zoomIn = true;

  constructor() {
    this.zoomIn = !ScreenUtils.isMobileScreen();
  }

  ngOnInit() {
    timer(3000).subscribe(() => {
      this.hide = true;
    });
  }
}
