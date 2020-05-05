import {Component, Input, OnInit} from '@angular/core';
import {timer} from 'rxjs';

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

  constructor() { }

  ngOnInit() {
    timer(3000).subscribe(() => {
      this.hide = true;
    });
  }
}
