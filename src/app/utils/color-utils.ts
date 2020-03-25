import {memotypeColors, memotypeRarities} from '../consts/MemotypeData';
import {GlobalConst} from '../consts/GlobalConst';

export class ColorUtils {

  static getRarityColor(lvl: number): string {
    if (lvl >= 50) { return '#000'; }
    const index = Math.floor(lvl / GlobalConst.LVL_COF);
    return memotypeColors[memotypeRarities[index]];
  }
}
