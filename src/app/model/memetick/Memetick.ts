import {MemetickRank} from './MemetickRank';

export class Memetick {
  constructor(
    public id: string,
    public nick: string,
    public cookies: number,
    public rank: MemetickRank,
  ) {

  }
}
