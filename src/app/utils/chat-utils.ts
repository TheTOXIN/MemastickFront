import {ChatMessage} from '../model/chat/ChatMessage';
import {UUID} from 'angular2-uuid';

export class ChatUtils {

  static prepare(
    msg: ChatMessage,
    messages: ChatMessage[],
    memetickId: UUID,
    isNew: boolean
  ) {
    msg.my = msg.memetickId === memetickId;
    msg.direct = true;
    msg.anim = isNew;

    if (msg.my) {
      msg.direct = false;
    } else if (messages.length !== 0) {

      const prevIndex = isNew ? messages.length - 1 : 0;
      const prev = messages[prevIndex];

      msg.direct = prev.direct === (msg.memetickId === prev.memetickId);
    }
  }
}
