import {Component, Input, OnInit} from '@angular/core';
import {MemeCommentBest} from '../../model/meme/MemeCommentBest';
import {MemetickAvatarApiService} from '../../api/memetick-avatar-api-service';
import {Router} from '@angular/router';
import {ScreenUtils} from '../../utils/screen-utils';

@Component({
  selector: 'app-meme-best-comment',
  templateUrl: './meme-best-comment.component.html',
  styleUrls: ['./meme-best-comment.component.scss']
})
export class MemeBestCommentComponent implements OnInit {

  @Input()
  public comment: MemeCommentBest;

  public avatar: string;

  minText = 8;
  maxText = 16;

  constructor(
    private router: Router,
    private avatarApi: MemetickAvatarApiService
  ) {
    if (!ScreenUtils.isMobileScreen()) {
      this.minText = 14;
      this.maxText = 24;
    }
  }

  ngOnInit() {
    this.avatar = this.avatarApi.dowloadAvatar(
      this.comment.memetickId
    );
  }

  commentsView() {
    alert();
  }

  memetickView() {
    this.router.navigate(['/home/memetick', this.comment.memetickId]);
  }
}
