import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MemeApiService} from '../../api/meme-api-service';
import {OauthApiService} from '../../services/oauth-api-service';
import {MemeResearchComponent} from '../meme-research/meme-research.component';
import {MemeViewComponent} from '../meme-view/meme-view.component';
import {Meme} from '../../model/Meme';
import {MemeData} from '../../model/MemeData';
import {MemetickAvatarApiService} from '../../api/memetick-avatar-api-service';
import {Meta} from '@angular/platform-browser';
import {CardService} from '../../services/card-service';
import {UUID} from 'angular2-uuid';
import {MemetickCardComponent} from '../../memetick/memetick-card/memetick-card.component';

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private memeApi: MemeApiService,
    public avatrApi: MemetickAvatarApiService,
    public ouath: OauthApiService,
    private meta: Meta,
    private cardService: CardService
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
            this.addMeta(data.url);
            this.memeURL = data.url;
            this.isLoad = false;
          },
          () => this.toStart()
        );
      }
    });
  }

  addMeta(url: string) {
    this.meta.removeTag('property=\"og:image\"');
    this.meta.addTag( { property: 'og:image', content: url } );
  }

  toHome() {
    this.router.navigateByUrl('/home');
  }

  toStart() {
    this.router.navigateByUrl('/start');
  }

  memeView(meme: Meme) {
    this.view.viewShow(meme);
  }

  memeResearch(meme: Meme) {
    this.cardService.open({
      content: MemeResearchComponent,
      meme: meme
    });
  }

  memetickCard(memetickId: UUID) {
    this.cardService.open({
      content: MemetickCardComponent,
      memetickId: memetickId
    });
  }
}
