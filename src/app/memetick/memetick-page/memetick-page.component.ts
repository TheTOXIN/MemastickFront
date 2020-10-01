import {Component, OnInit} from '@angular/core';
import {MemetickApiService} from '../../api/memetick-api-service';
import {MemetickProfile} from '../../model/memetick/MemetickProfile';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenApiService} from '../../api/token-api-service';

@Component({
  selector: 'app-memetick-page',
  templateUrl: './memetick-page.component.html',
  styleUrls: ['./memetick-page.component.scss']
})
export class MemetickPageComponent implements OnInit {

  public memetick: MemetickProfile;

  memetickLoad = false;
  memetickMe = false;

  constructor(
    private tokensApi: TokenApiService,
    private memetickApi: MemetickApiService,
    public router: Router,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const memetickId = params['id'];
      this.memetickMe = memetickId === undefined;

      let apiObservable;

      if (this.memetickMe) {
        apiObservable = this.memetickApi.profileMe();
      } else {
        apiObservable = this.memetickApi.profile(memetickId);
      }

      apiObservable.subscribe(memetick => {
        this.memetick = memetick;
        this.memetickLoad = true;
      });
    });
  }

  back() {
    window.history.back();
  }
}
