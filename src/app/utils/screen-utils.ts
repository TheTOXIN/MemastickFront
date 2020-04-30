import {GlobalConst} from '../consts/GlobalConst';

export class ScreenUtils {

  static isMobileScreen(): boolean {
    return window.innerWidth <= GlobalConst.MOBILE_WIDTH;
  }
}
