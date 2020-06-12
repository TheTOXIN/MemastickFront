import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import {FormsModule} from '@angular/forms';
import {ChatMessageComponent} from './chat-message/chat-message.component';
import {MemetickModule} from '../memetick/memetick.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MemetickModule
  ],
  declarations: [
    ChatComponent,
    ChatMessageComponent
  ],
})
export class ChatModule { }
