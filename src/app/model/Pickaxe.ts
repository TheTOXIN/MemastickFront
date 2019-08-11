import {UUID} from 'angular2-uuid';

export class Pickaxe {
  constructor(
    public have: boolean,
    public time: string,
    public token: UUID
  ) {

  }
}
