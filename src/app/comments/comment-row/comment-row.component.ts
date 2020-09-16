import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MemeComment} from '../../model/meme/MemeComment';
import {MemeCommentApiService} from '../../api/meme-comment-api.-service';
import {animate, keyframes, style, transition, trigger} from '@angular/animations';
import {CardService} from '../../services/card-service';
import {MemetickCardComponent} from '../../memetick/memetick-card/memetick-card.component';
import {CardState} from '../../state/card-state.service';

@Component({
  selector: 'app-comment-row',
  templateUrl: './comment-row.component.html',
  styleUrls: ['./comment-row.component.scss'],
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
export class CommentRowComponent implements OnInit {

  @Input()
  public comment: MemeComment;

  @Input()
  public avatar: string;

  constructor(
    private cardState: CardState,
    private commentApi: MemeCommentApiService,
    private cardService: CardService
  ) {

  }

  ngOnInit() {

  }

  approveComment(comment: MemeComment) {
    this.voteComment(comment, true);
  }

  disapproveComment(comment: MemeComment) {
    this.voteComment(comment, false);
  }

  voteComment(comment: MemeComment, vote: boolean) {
    if (comment.vote === vote) { return; }
    if (comment.vote !== null) { return; }

    comment.vote = vote;
    comment.point += vote ? 1 : -1;

    this.commentApi.voteComment(comment.commentId, vote);
  }

  memetickCard() {
    this.cardState.modal.close();

    this.cardService.open({
      content: MemetickCardComponent,
      memetickId: this.comment.memetickId
    });
  }
}
