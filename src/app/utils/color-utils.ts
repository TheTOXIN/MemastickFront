import {memotypeColors, memotypeRarities} from '../consts/MemotypeData';
import {GlobalConst} from '../consts/GlobalConst';

export class ColorUtils {

  static getRarityColor(lvl: number): string {
    return  memotypeColors[memotypeRarities[Math.floor(
      lvl / GlobalConst.LVL_COF
    )]];
  }
}
