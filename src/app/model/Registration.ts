export class Registration {
  constructor(
    public invite: string,
    public login: string,
    public password: string,
    public passwordRepeat: string,
    public creedAgree: boolean
  ) {
  }
}
