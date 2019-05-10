import {TokenType} from '../consts/TokenType';

export class TokenData {

  public type: TokenType;

  public image: string;
  public name: string;
  public designation: string;
  public description: string;
  public count: number;

  constructor(type: TokenType, image: string, name: string, designation: string, description: string, count: number) {
    this.type = type;
    this.image = image;
    this.name = name;
    this.designation = designation;
    this.description = description;
    this.count = count;
  }
}
