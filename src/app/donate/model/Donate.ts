import {DonateMessage} from './DonateMessage';
import {MemotypeRarity} from '../../consts/MemotypeRarity';
import {DonateRating} from './DonateRating';

export class Donate {
  constructor(
    public message: DonateMessage,
    public rating: Map<MemotypeRarity, DonateRating[]>
  ) {

  }
}
