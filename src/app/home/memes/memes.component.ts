import { Component, OnInit } from '@angular/core';
import {MemFireService} from '../../services/mem-fire-service';

@Component({
  selector: 'app-memes',
  templateUrl: './memes.component.html',
  styleUrls: ['./memes.component.scss']
})
export class MemesComponent implements OnInit {

  selectedFiles: FileList;

  constructor(
    private memFire: MemFireService
  ) {

  }

  ngOnInit() {
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  uploadSingle() {
    this.memFire.startUpload(this.selectedFiles);
  }

}
