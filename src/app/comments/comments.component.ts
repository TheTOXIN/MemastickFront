import {Component, Input, OnInit} from '@angular/core';
import {MemeComment} from '../model/meme/MemeComment';
import {MemeCommentApiService} from '../api/meme-comment-api.-service';
import {UUID} from 'angular2-uuid';
import {MemetickAvatarApiService} from '../api/memetick-avatar-api-service';
import {Router} from '@angular/router';
import {animate, keyframes, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  animations: [
    trigger('pointState', [
      transition('* => *', [
        animate(200, keyframes([
          style({ transform: 'scale(1)'}),
          style({ transform: 'scale(1.2)'}),
          style({ transform: 'scale(1)'})
        ]))
      ])
    ]),
  ]
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
    private avatarApi: MemetickAvatarApiService,
    private commentApi: MemeCommentApiService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.initComments();
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

  approveComment(comment: MemeComment) {
    this.voteComment(comment, true);
  }

  disapproveComment(comment: MemeComment) {
    this.voteComment(comment, false);
  }

  voteComment(comment: MemeComment, vote: boolean) {
    if (comment.vote === vote) { return; }
    comment.vote = vote;

    const point = vote ? 1 : -1;
    comment.point += point;

    this.commentApi.voteComment(comment.commentId, vote);
  }

  toMemetick(memetickId: UUID) {
    this.router.navigate(['/home/memetick', memetickId]);
  }
}
