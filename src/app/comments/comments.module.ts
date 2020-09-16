import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CommentsComponent} from './comments/comments.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    CommentsComponent
  ],
  exports: [
    CommentsComponent
  ],
  entryComponents: [
    CommentsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class CommentsModule {

}
