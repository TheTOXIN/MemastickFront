import {Component, Input, OnInit} from '@angular/core';
import {MemeComment} from '../model/meme/MemeComment';
import {MemeCommentApiService} from '../api/meme-comment-api.-service';
import {UUID} from 'angular2-uuid';
import {ColorUtils} from '../utils/color-utils';
import {MemetickAvatarApiService} from '../api/memetick-avatar-api-service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Input()
  public memeId: UUID;

  @Input()
  public sort: string;

  public commentsLoad = false;
  public comments: MemeComment[];

  public memetickAvatars = [];

  constructor(
    private avatrApi: MemetickAvatarApiService,
    private commentApi: MemeCommentApiService
  ) {

  }

  ngOnInit() {
    this.initComments();
  }

  initComments() {
    this.commentApi.readComments(this.memeId, this.sort).subscribe(data => {
      this.comments = data;
      this.initAvatars();
      this.commentsLoad = true;
    });
  }

  initAvatars() {
    for (const c of this.comments) {
      this.memetickAvatars[c.memetickId + ''] = this.avatrApi.dowloadAvatar(c.memetickId);
    }
  }

  approveComment(commentId: UUID) {
    this.commentApi.voteComment(commentId, true);
  }

  disapproveComment(commentId: UUID) {
    this.commentApi.voteComment(commentId, false);
  }
}
