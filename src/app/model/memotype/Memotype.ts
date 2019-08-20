import {UUID} from 'angular2-uuid';
import {MemotypeRarity} from '../../consts/MemotypeRarity';

export class Memotype {
  constructor(
    public id: UUID,
    public rarity: MemotypeRarity,
    public title: string,
    public text: string,
    public image: string,
    public set: string,
    public level: number,
    public count: number,
  ) {

  }
}
