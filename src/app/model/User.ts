import {UUID} from 'angular2-uuid';
import {RoleType} from '../consts/RoleType';

export class User {

  constructor(
    public id: UUID,
    public login: String,
    public role: RoleType,
    public memetickId: UUID
  ) {

  }
}
