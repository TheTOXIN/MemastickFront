import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import {FormsModule} from '@angular/forms';
import {ChatMessageComponent} from './chat-message/chat-message.component';
import {MemetickModule} from '../memetick/memetick.module';
import {ModalsModule} from '../modals/modals.module';
import {MemotypeModule} from '../memotype/memotype.module';
import {DirectivesModule} from '../directivies/directives.module';
import {SharedModule} from '../shared/shared.module';
import {ChatOnlineComponent} from './chat-online/chat-online.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MemetickModule,
    ModalsModule,
    MemotypeModule,
    DirectivesModule,
    SharedModule
  ],
  declarations: [
    ChatComponent,
    ChatMessageComponent,
    ChatOnlineComponent
  ],
  exports: [
    ChatMessageComponent
  ]
})
export class ChatModule { }
