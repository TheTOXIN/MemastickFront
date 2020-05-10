import {EvolveStep} from './EvolveStep';
import {MemeType} from './MemeType';

export const evolveStepDescription = [];
export const evolveStepText = [];
export const memeTypeText = [];
export const creedRules = [];

export class TextData {}

evolveStepDescription[EvolveStep.ADAPTATION] = 'Продвигай мем вверх в популяции, увеличивая его индекс, с помощью токена - Пробирки';
evolveStepDescription[EvolveStep.FITNESS] = 'Оцени мем с помощью 3 параметров - ЛОЛ, ОМГ, ХММ, используй токен - Миероскоп';
evolveStepDescription[EvolveStep.MUTATION] = 'Во время мутации ты можешь оставить комментарий под мемом, с помощью токена - Мутаген';
evolveStepDescription[EvolveStep.CROSSING] = '* В разработке';
evolveStepDescription[EvolveStep.SURVIVAL] = 'Повысь мему иммунитет, используя токен - Антибиотик, это даст 100% выживаемость при отборе';

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

