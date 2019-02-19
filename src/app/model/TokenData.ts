export class TokenData {

  public image: string;
  public name: string;
  public designation: string;
  public description: string;
  public count: number;

  constructor(image: string, name: string, designation: string, description: string, count: number) {
    this.image = image;
    this.name = name;
    this.designation = designation;
    this.description = description;
    this.count = count;
  }
}
