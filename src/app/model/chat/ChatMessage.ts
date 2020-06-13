import {UUID} from 'angular2-uuid';
import {ChatMessageMode} from '../../consts/ChatMessageMode';

export class ChatMessage {
  constructor(
    public number?: number,
    public text?: string,
    public nick?: string,
    public sticker?: string,
    public memetickId?: UUID,
    public memotypeId?: UUID,
    public mode?: ChatMessageMode,
    public creating?: Date,
    public my?: boolean,
    public anim?: boolean,
    public direct?: boolean,
  ) {

  }
}
