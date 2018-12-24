import {Component, OnInit} from '@angular/core';
import {HelloService} from '../services/hello-service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  constructor(
    private hello: HelloService
  ) {
  }

  ngOnInit() {
    this.hello.sendHello();
  }

}
