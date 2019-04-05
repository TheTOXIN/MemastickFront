import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MemeApiService} from '../../api/meme-api-service';

@Component({
  selector: 'app-memes-share',
  templateUrl: './memes-share.component.html',
  styleUrls: ['./memes-share.component.scss']
})
export class MemesShareComponent implements OnInit {

  public memeURL: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private memeApi: MemeApiService,
  ) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.memeApi.memePage(params['id']).subscribe(
        data => this.memeURL = data.url,
        error => this.router.navigateByUrl('error')
      );
    });
  }

  toSignIn() {
    this.router.navigateByUrl('/pages/sign-in');
  }

  toSignUp() {
    this.router.navigateByUrl('/pages/sign-up');
  }
}
