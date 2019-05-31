import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MemeApiService} from '../../api/meme-api-service';
import {OauthApiService} from '../../services/oauth-api-service';
import {MemeResearchComponent} from '../meme-research/meme-research.component';
import {MemeViewComponent} from '../meme-view/meme-view.component';
import {Meme} from '../../model/Meme';
import {MemeData} from '../../model/MemeData';
import {MemetickAvatarApiService} from '../../api/memetick-avatar-api-service';

@Component({
  selector: 'app-memes-share',
  templateUrl: './memes-share.component.html',
  styleUrls: ['./memes-share.component.scss']
})
export class MemesShareComponent implements OnInit {

  public memeData: MemeData;
  public memeURL: string;

  isLoad = true;
  isLogin = true;

  @ViewChild(MemeViewComponent) view: MemeViewComponent;
  @ViewChild(MemeResearchComponent) research: MemeResearchComponent;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private memeApi: MemeApiService,
    public avatrApi: MemetickAvatarApiService,
    public ouath: OauthApiService
  ) {
  }

  ngOnInit() {
    this.isLogin = this.ouath.checkTokens();
    this.route.params.subscribe(params => {
      if (this.isLogin) {
        this.memeApi.memePage(params['id']).subscribe(page => {
           this.memeData = new MemeData(page);
          this.memeData.avatar = this.avatrApi.dowloadAvatar(page.memetick.id);
          this.isLoad = false;
          },
          () => this.router.navigateByUrl('error')
        );
      } else {
        this.memeApi.memeIMG(params['id']).subscribe(data => {
            this.memeURL = data.url;
            this.isLoad = false;
          },
          (error) => alert(error)
        );
      }
    });
  }

  toSignIn() {
    this.router.navigateByUrl('/pages/sign-in');
  }

  toSignUp() {
    this.router.navigateByUrl('/pages/sign-up');
  }

  toHome() {
    this.router.navigateByUrl('/home');
  }

  memeView(meme: Meme) {
    this.view.viewShow(meme);
  }

  memeResearch(meme: Meme) {
    this.research.researchShow(meme);
  }
}
