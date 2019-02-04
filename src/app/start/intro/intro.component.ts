import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {OAuthService} from 'angular-oauth2-oidc';
import {OauthApiService} from '../../services/oauth-api-service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

  constructor(
    private oauth: OauthApiService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  toSignIn() {
    if (this.oauth.checkTokens()) {
      this.router.navigateByUrl('/home');
    } else {
      this.router.navigateByUrl('/pages/sign-in');
    }
  }

  toSignUp() {
    this.router.navigateByUrl('/pages/sign-up');
  }

}
