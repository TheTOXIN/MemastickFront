import {UUID} from 'angular2-uuid';

export class MemetickPreview {
  constructor(
    public id: UUID,
    public nick: string,
    public login: string,
    public dna: number,
  ) {

  }
}