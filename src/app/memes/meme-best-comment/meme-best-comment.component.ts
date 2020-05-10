import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MemeCommentBest} from '../../model/meme/MemeCommentBest';
import {MemetickAvatarApiService} from '../../api/memetick-avatar-api-service';
import {ScreenUtils} from '../../utils/screen-utils';
import {CommentViewModalComponent} from '../../modals/comment-view-modal/comment-view-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MemetickCardComponent} from '../../memetick/memetick-card/memetick-card.component';
import {UUID} from 'angular2-uuid';

@Component({
  selector: 'app-meme-best-comment',
  templateUrl: './meme-best-comment.component.html',
  styleUrls: ['./meme-best-comment.component.scss']
})
export class MemeBestCommentComponent implements OnInit {

  @ViewChild(MemetickCardComponent) card: MemetickCardComponent;

  @Input()
  public comment: MemeCommentBest;

  @Output()
  public memeticker = new EventEmitter<UUID>();

  public avatar: string;

  minText = 8;
  maxText = 16;

  constructor(
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

  memetickCard() {
    this.memeticker.emit(
      this.comment.memetickId
    );
  }
}
