import {EvolveStep} from './EvolveStep';
import {MemeType} from './MemeType';

export const evolveStepText = [];
export const memeTypeText = [];

export class TextData {}

evolveStepText[EvolveStep.ADAPTATION] = 'Адаптация';
evolveStepText[EvolveStep.FITNESS] = 'Оценка';
evolveStepText[EvolveStep.MUTATION] = 'Мутация';
evolveStepText[EvolveStep.CROSSING] = 'Скрещивание';
evolveStepText[EvolveStep.SURVIVAL] = 'Выживание';

memeTypeText[MemeType.EVLV] = 'ЭВОЛЮЦИЯ';
memeTypeText[MemeType.SLCT] = 'ОТБОР';
memeTypeText[MemeType.DEAD] = 'МЁРТВ';
memeTypeText[MemeType.INDV] = 'ОСОБЬ';
memeTypeText[MemeType.BAAN] = 'БАН';

