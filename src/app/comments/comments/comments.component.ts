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
  public options: CardOptions;

  @Input()
  public comments: MemeComment[];

  @Input()
  public sort: string = 'point';

  @Input()
  public emptyText = 'Без комментариев 🤐';

  @Input()
  public maxHeight = 'auto';

  footText: boolean;

  public commentsLoad = false;
  public memetickAvatars = [];

  constructor(
    private avatarApi: MemetickAvatarApiService,
    private commentApi: MemeCommentApiService,
  ) {
    this.footText = false;
  }

  ngOnInit() {
    if (this.options != null) {
      this.memeId = this.options.memeId;
      this.footText = true;
    }

    if (this.comments == null) {
      this.comments = [];
    }

    if (this.memeId != null) {
      this.loadComments();
    } else  {
      this.initComments();
    }
  }

  loadComments() {
    this.commentsLoad = false;

    this.commentApi.readComments(this.memeId, this.sort).subscribe(data => {
      this.comments = data;
      this.initComments();
    });
  }

  initComments() {
    this.initAvatars();
    this.commentsLoad = true;
  }

  initAvatars() {
    for (const c of this.comments) {
      this.memetickAvatars[c.memetickId + ''] = this.avatarApi.dowloadAvatar(c.memetickId);
    }
  }
}
