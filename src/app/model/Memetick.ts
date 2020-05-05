import {MemetickRank} from './MemetickRank';

export class Memetick {
  constructor (
    public id: string,
    public nick: string,
    public follow: boolean,
    public online: boolean,
    public memecoins: number,
    public cookies: number,
    public rank: MemetickRank
  ) {

  }
}
