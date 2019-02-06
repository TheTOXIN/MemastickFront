import {Component, OnInit} from '@angular/core';
import {OauthApiService} from './services/oauth-api-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private oauth: OauthApiService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    if (this.oauth.checkTokens()) {
      this.router.navigateByUrl('/home');
    } else {
      this.router.navigateByUrl('/start');
    }
  }

}
