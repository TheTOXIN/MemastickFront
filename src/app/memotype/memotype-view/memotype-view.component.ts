import {Component, Input, OnInit} from '@angular/core';
import {Memotype} from '../../model/memotype/Memotype';
import {memotypeColors, memotypeNames} from '../../consts/MemotypeData';
import {UUID} from 'angular2-uuid';
import {MemotypeApiService} from '../../api/memotype-api-service';

@Component({
  selector: 'app-memotype-view',
  templateUrl: './memotype-view.component.html',
  styleUrls: ['./memotype-view.component.scss']
})
export class MemotypeViewComponent implements OnInit {

  @Input()
  public memotype: Memotype;

  public memotypeColors;
  public memotypeNames;

  isPreview = false;
  isLoad = false;

  constructor(
    private memotypeApi: MemotypeApiService
  ) {
    this.memotypeColors = memotypeColors;
    this.memotypeNames = memotypeNames;
  }

  ngOnInit() {
  }

  viewShow(memotype: Memotype) {
    this.memotype = memotype;
    this.isPreview = true;
  }

  viewLoad(memotypeId: UUID) {
    this.isLoad = true;
    this.isPreview = true;

    this.memotypeApi.readOne(memotypeId).subscribe(data => {
      this.memotype = data;
      this.isLoad = false;
    });
  }

  viewClose() {
    this.memotype = null;
    this.isPreview = false;
  }
}
