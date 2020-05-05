import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MemeApiService} from '../../api/meme-api-service';
import {MemeData} from '../../model/MemeData';
import {MemetickAvatarApiService} from '../../api/memetick-avatar-api-service';
import {MemeResearchComponent} from '../meme-research/meme-research.component';

@Component({
  selector: 'app-meme-research-link',
  templateUrl: './meme-research-link.component.html',
  styleUrls: ['./meme-research-link.component.scss']
})
export class MemeResearchLinkComponent implements OnInit {

  public isLoad = true;
  public memeData: MemeData;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private memeApi: MemeApiService,
    public avatrApi: MemetickAvatarApiService,
  ) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.memeApi.memePage(params['id']).subscribe(page => {
          this.memeData = new MemeData(page);
          this.memeData.avatar = this.avatrApi.dowloadAvatar(page.memetick.id);
          this.isLoad = false;
        },
        () => this.router.navigateByUrl('error')
      );
    });
  }

  toHome() {
    this.router.navigateByUrl('/home');
  }
}
