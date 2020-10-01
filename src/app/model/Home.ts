import {ChatMessage} from './chat/ChatMessage';
import {MemetickRank} from './memetick/MemetickRank';
import {MemetickPreview} from './memetick/MemetickPreview';

export class Home {
  constructor (
    public memetick: MemetickPreview,
    public rank: MemetickRank,
    public message: string,
    public day: number,
    public creedAgree: boolean,
    public cellState: number,
    public selectTimer: string,
    public chat: ChatMessage[]
  ) {

  }
}
