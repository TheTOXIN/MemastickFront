import {UUID} from 'angular2-uuid';
import {MemotypeRarity} from '../../consts/MemotypeRarity';

export class Memotype {
  constructor(
    public id: UUID,
    private rarity: MemotypeRarity,
    private title: string,
    private text: string,
    private image: string,
    private set: string,
    private level: number,
    private count: number,
  ) {

  }
}
