import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MemeCommentBest} from '../../model/meme/MemeCommentBest';
import {MemetickAvatarApiService} from '../../api/memetick-avatar-api-service';
import {ScreenUtils} from '../../utils/screen-utils';
import {MemetickCardComponent} from '../../memetick/memetick-card/memetick-card.component';
import {CardService} from '../../services/card-service';
import {CommentsComponent} from '../comments/comments.component';
import {MemotypeViewComponent} from '../../memotype/memotype-view/memotype-view.component';

@Component({
  selector: 'app-comment-best',
  templateUrl: './comment-best.component.html',
  styleUrls: ['./comment-best.component.scss']
})
export class CommentBestComponent implements OnInit {

  @ViewChild(MemetickCardComponent) card: MemetickCardComponent;

  @Input()
  public comment: MemeCommentBest; // TODO GET FROM MEME PAGE

  @Input()
  public withWarp = false;

  public avatar: string;

  minText = 8;
  maxText = 16;

  constructor(
    private cardService: CardService,
    private avatarApi: MemetickAvatarApiService,
  ) {
    if (!ScreenUtils.isMobileScreen()) {
      this.minText = 14;
      this.maxText = 24;
    }
  }

  ngOnInit() {
    if (this.comment != null) {
      this.avatar = this.avatarApi.dowloadAvatar(
        this.comment.memetickId
      );
    }
  }

  commentsCard() {
    this.cardService.open({
      content: CommentsComponent,
      memeId: this.comment.memeId
    });
  }

  memetickCard() {
    this.cardService.open({
      content: MemetickCardComponent,
      memetickId: this.comment.memetickId
    });
  }
}
