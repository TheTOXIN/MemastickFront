import {MemotypeRarity} from '../../consts/MemotypeRarity';
import {UUID} from 'angular2-uuid';

export class DonaterRating {

  constructor(
    public id: UUID,
    public name: string,
    public avatar: string,
    public time: string,
    public rarity: MemotypeRarity
  ) {

  }
}
