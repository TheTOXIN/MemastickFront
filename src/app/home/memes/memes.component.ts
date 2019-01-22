import { Component, OnInit } from '@angular/core';
import {MemFireService} from '../../services/mem-fire-service';

@Component({
  selector: 'app-memes',
  templateUrl: './memes.component.html',
  styleUrls: ['./memes.component.scss']
})
export class MemesComponent implements OnInit {

  constructor(
    private memFire: MemFireService
  ) {

  }

  ngOnInit() {
  }

  upload(event) {
    this.memFire.startUpload(event.target.files);
  }

}
