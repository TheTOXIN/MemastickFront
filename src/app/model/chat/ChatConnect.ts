import {UUID} from 'angular2-uuid';
import {RoleType} from '../../consts/RoleType';
import {MemotypeSet} from '../memotype/MemotypeSet';

export class ChatConnect {
  constructor(
    public id: UUID,
    public role: RoleType,
    public online: UUID[],
    public memotypes: MemotypeSet[]
  ) {

  }
}
