import {Component, Input, OnInit} from '@angular/core';
import {MemeCommentBest} from '../../model/meme/MemeCommentBest';
import {MemetickAvatarApiService} from '../../api/memetick-avatar-api-service';
import {Router} from '@angular/router';
import {ScreenUtils} from '../../utils/screen-utils';
import {PushRequestModalComponent} from '../../modals/push-request-modal/push-request-modal.component';
import {CommentViewModalComponent} from '../../modals/comment-view-modal/comment-view-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UUID} from 'angular2-uuid';

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
    private modalService: NgbModal,
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
    const modalRef = this.modalService.open(CommentViewModalComponent, {'centered': true});
    modalRef.componentInstance.memeId = this.comment.memeId;
  }

  memetickView() {
    this.router.navigate(['/home/memetick', this.comment.memetickId]);
  }
}
