export class Page<C> {
  constructor(
    public content: C,
    public totalElements: number,
    public totalPages: number,
    public size: number,
    public last: boolean,
    public first: boolean,
    public empty: boolean,
  ) {

  }
}
