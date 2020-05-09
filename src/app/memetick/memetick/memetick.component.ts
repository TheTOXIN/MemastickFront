import {Component, OnInit} from '@angular/core';
import {MemetickApiService} from '../../api/memetick-api-service';
import {Memetick} from '../../model/Memetick';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenApiService} from '../../api/token-api-service';

@Component({
  selector: 'app-memetick',
  templateUrl: './memetick.component.html',
  styleUrls: ['./memetick.component.scss']
})
export class MemetickComponent implements OnInit {

  public memetick: Memetick;
  public wallet: any;

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
        apiObservable = this.memetickApi.viewMe();
      } else {
        apiObservable = this.memetickApi.view(memetickId);
      }

      apiObservable.subscribe(memetick => {
        this.memetick = memetick;
        this.tokensApi.memetick(this.memetick.id).subscribe((data) => {
          this.wallet = data.wallet;
          this.memetickLoad = true;
        });
      });
    });
  }

  back() {
    window.history.back();
  }
}
