import {EvolveStep} from './EvolveStep';
import {MemeType} from './MemeType';

export const evolveStepText = [];
export const memeTypeText = [];
export const creedRules = [];

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

creedRules[0] = '💩 Нельзя воровать и создавать мемы с других источников';
creedRules[1] = '😢 Мемы не должны оскорблять чувства других людей';
creedRules[2] = '🔞 Запрещено создание контента с цензурой 18+';

