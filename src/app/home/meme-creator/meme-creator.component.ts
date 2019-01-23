import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MemFireService} from '../../services/mem-fire-service';

@Component({
  selector: 'app-meme-creator',
  templateUrl: './meme-creator.component.html',
  styleUrls: ['./meme-creator.component.scss']
})
export class MemeCreatorComponent implements OnInit {

  isHovering: boolean;

  constructor(
    private router: Router,
    private memFire: MemFireService,
  ) {

  }

  ngOnInit() {
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
    console.log(this.isHovering);
  }

  upload(event) {
    this.memFire.startUpload(event);
    this.router.navigateByUrl('/home');
  }

}
