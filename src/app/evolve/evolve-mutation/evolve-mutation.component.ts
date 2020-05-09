import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {EvolveMeme} from '../../model/EvolveMeme';
import {TokenAcceptApiService} from '../../api/token-accept-api.service';
import {LoaderStatus} from '../../consts/LoaderStatus';
import {AcceptComponent} from '../../shared/accpet/accept.component';
import {tokenIcons} from '../../model/TokenData';
import {TokenType} from '../../consts/TokenType';
import {TokenAccept} from '../../model/tokens/TokenAccept';
import {ErrorHandlerService} from '../../services/error-handler-service';
import {MemeComment} from '../../model/meme/MemeComment';
import {MemeCommentApiService} from '../../api/meme-comment-api.-service';
import {ValidConst} from '../../consts/ValidConst';
import {CommentsComponent} from '../../comments/comments.component';
import {AcceptService} from '../../services/accept-service';

@Component({
  selector: 'app-evolve-mutation',
  templateUrl: './evolve-mutation.component.html',
  styleUrls: ['./evolve-mutation.component.scss']
})
export class EvolveMutationComponent implements OnInit {

  @ViewChild(CommentsComponent) memeComments: CommentsComponent;

  public status;
  public message;
  public type;
  public img;

  @Input()
  public evolve: EvolveMeme;

  public myComment: string;

  validComment = false;

  commentMsg = 'Оставь комментарий первым 😉 Лучший комментарий будет закреплен за мемом 😱';

  constructor(
    private acceptService: AcceptService,
    private tokenAcceptApi: TokenAcceptApiService,
  ) {
    this.type = TokenType.MUTAGEN;
    this.status = LoaderStatus.NONE;
    this.message = '';
    this.img = tokenIcons[this.type];
  }

  ngOnInit() {
  }

  mutation() {
    if (!this.commentValid()) { return; }

    this.status = LoaderStatus.LOAD;
    this.message = 'Мутировать комментарием?';

    this.acceptService.accept({img: this.img}).then(
      () => this.makeMutation(),
      () => this.status = LoaderStatus.NONE
    );
  }

  checkValid() {
    this.validComment = this.commentValid();
  }

  commentValid() {
    return this.myComment != null && this.myComment !== '' && this.myComment.length <= ValidConst.MAX_MEME_TEXT;
  }

  makeMutation() {
    const body = new TokenAccept(null, this.myComment);
    this.tokenAcceptApi.accept(this.evolve.memeId, this.type, body).subscribe(
      () => this.successMutation(),
      (error) => this.errorMutation(error)
    );
  }

  successMutation() {
    this.evolve.canApplyToken = false;
    this.memeComments.initComments();
    this.message = 'Мем мутирован!';
    this.status = LoaderStatus.DONE;
  }

  errorMutation(error: any) {
    this.message = ErrorHandlerService.tokenError(error.error.code);
    this.status = LoaderStatus.ERROR;
  }
}
