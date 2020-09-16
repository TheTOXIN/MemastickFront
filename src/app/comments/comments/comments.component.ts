import {Component, Input, OnInit} from '@angular/core';
import {UUID} from 'angular2-uuid';
import {MemeComment} from '../../model/meme/MemeComment';
import {MemetickAvatarApiService} from '../../api/memetick-avatar-api-service';
import {MemeCommentApiService} from '../../api/meme-comment-api.-service';
import {CardOptions} from '../../options/card-options';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Input()
  public memeId: UUID;

  @Input()
  public sort: string = 'point';

  @Input()
  public withTitle: boolean = true;

  @Input()
  public emptyText = 'Без комментариев 🤐';

  @Input()
  public options: CardOptions;

  public comments: MemeComment[] = [];
  public commentsLoad = false;
  public memetickAvatars = [];

  constructor(
    private avatarApi: MemetickAvatarApiService,
    private commentApi: MemeCommentApiService,
  ) {
  }

  ngOnInit() {
    if (this.options != null) {
      this.memeId = this.options.memeId;
    }

    if (this.memeId != null) {
      this.initComments();
    }
  }

  initComments() {
    this.commentsLoad = false;
    this.commentApi.readComments(this.memeId, this.sort).subscribe(data => {
      this.comments = data;
      this.initAvatars();
      this.commentsLoad = true;
    });
  }

  initAvatars() {
    for (const c of this.comments) {
      this.memetickAvatars[c.memetickId + ''] = this.avatarApi.dowloadAvatar(c.memetickId);
    }
  }
}
