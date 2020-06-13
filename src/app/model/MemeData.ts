import {MemePage} from './MemePage';

export class MemeData {

  public page: MemePage;
  public avatar: String;

  constructor(page: MemePage) {
    this.page = page;
  }

  counterState = 'default';
  chromosomeState = 'default';
  likeState = 'default';
  loadState = false;
}
