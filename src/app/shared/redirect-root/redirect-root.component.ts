import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {OauthApiService} from '../../services/oauth-api-service';

@Component({
  selector: 'app-redirect-root',
  templateUrl: './redirect-root.component.html',
  styleUrls: ['./redirect-root.component.scss']
})
export class RedirectRootComponent implements OnInit {

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
