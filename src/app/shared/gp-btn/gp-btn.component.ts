import {Component, OnInit} from '@angular/core';
import {StorageService} from '../../services/storage-service';

@Component({
  selector: 'app-gp-btn',
  templateUrl: './gp-btn.component.html',
  styleUrls: ['./gp-btn.component.scss']
})
export class GpBtnComponent implements OnInit {

  show = false;

  constructor(
    private storage: StorageService
  ) {

  }

  ngOnInit() {
    if (!this.storage.isTWA()) {
      this.show = true;
    }
  }
}
