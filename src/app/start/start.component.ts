import {Component, OnInit} from '@angular/core';
import {HelloApiService} from '../api/hello-api-service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  constructor(
    private hello: HelloApiService
  ) {
  }

  ngOnInit() {
    this.hello.sendHello();
  }

}
