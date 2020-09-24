import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommentsComponent} from './comments/comments.component';
import {SharedModule} from '../shared/shared.module';
import {CommentBestComponent} from './comment-best/comment-best.component';
import {AngularFittextModule} from 'angular-fittext';
import {CommentRowComponent} from './comment-row/comment-row.component';

@NgModule({
  declarations: [
    CommentsComponent,
    CommentRowComponent,
    CommentBestComponent
  ],
  exports: [
    CommentsComponent,
    CommentBestComponent
  ],
  entryComponents: [
    CommentsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AngularFittextModule
  ]
})
export class CommentsModule {

}
