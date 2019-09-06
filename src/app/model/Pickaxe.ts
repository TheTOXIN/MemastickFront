import {UUID} from 'angular2-uuid';

export class Pickaxe {
  constructor(
    public token: UUID,
    public have: boolean,
    public receipt: string
  ) {

  }
}
