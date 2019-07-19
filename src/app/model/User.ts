import {UUID} from 'angular2-uuid';
import {RoleType} from '../consts/RoleType';

export class User {

  constructor(
    private id: UUID,
    private login: String,
    private role: RoleType
  ) {

  }
}
