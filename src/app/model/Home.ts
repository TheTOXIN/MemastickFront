import {MemetickPreview} from './MemetickPreview';
import {MemetickRank} from './MemetickRank';
import {ChatMessage} from './chat/ChatMessage';

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
