import {MemotypeRarity} from '../../consts/MemotypeRarity';
import {UUID} from 'angular2-uuid';

export class DonateRating {

  constructor(
    public id: UUID,
    public name: string,
    public avatar: string,
    public time: string,
    public amount: number,
    public rarity: MemotypeRarity
  ) {

  }
}
