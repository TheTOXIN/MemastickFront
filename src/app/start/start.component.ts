import {Component, OnInit} from '@angular/core';
import {HelloApiService} from '../api/hello-api-service';
import {OauthApiService} from '../services/oauth-api-service';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  constructor(
    private hello: HelloApiService,
    public app: AppComponent
  ) {

  }

  ngOnInit() {
    this.app.control(false);
    this.hello.sendHello();
  }
}
