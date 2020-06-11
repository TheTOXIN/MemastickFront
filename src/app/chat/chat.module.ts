import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import {FormsModule} from '@angular/forms';
import {ChatMessageComponent} from './chat-message/chat-message.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    ChatComponent,
    ChatMessageComponent
  ],
})
export class ChatModule { }
