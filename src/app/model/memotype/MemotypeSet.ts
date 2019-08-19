import {Memotype} from './Memotype';

export class MemotypeSet {
  constructor(
    public name: string,
    public  description: string,
    public  size: number,
    public  count: number,
    public  memotypes: Memotype[],
  ) {

  }
}
