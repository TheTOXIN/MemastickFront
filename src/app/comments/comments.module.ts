import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CommentsComponent} from './comments/comments.component';
import {SharedModule} from '../shared/shared.module';
import {CommentBestComponent} from './comment-best/comment-best.component';
import {AngularFittextModule} from 'angular-fittext';

@NgModule({
  declarations: [
    CommentsComponent,
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
