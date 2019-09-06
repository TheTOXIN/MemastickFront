import {EvolveStep} from './EvolveStep';
import {MemeFilter} from './MemeFilter';

export const evolveIcons = [];
export const filterIcons = [];

export class IconsData {}

evolveIcons[EvolveStep.ADAPTATION] = 'assets/images/steps/1.png';
evolveIcons[EvolveStep.FITNESS] = 'assets/images/steps/2.png';
evolveIcons[EvolveStep.MUTATION] = 'assets/images/steps/3.png';
evolveIcons[EvolveStep.CROSSING] = 'assets/images/steps/4.png';
evolveIcons[EvolveStep.SURVIVAL] = 'assets/images/steps/5.png';


filterIcons[MemeFilter.POOL] = 'assets/images/icon/world.png';
filterIcons[MemeFilter.SLCT] = 'assets/images/icon/select.png';
filterIcons[MemeFilter.INDV] = 'assets/images/icon/1.png';
filterIcons[MemeFilter.SELF] = 'assets/images/icon/cell_ico.png';
filterIcons[MemeFilter.LIKE] = 'assets/images/icon/like_push.png';
filterIcons[MemeFilter.USER] = 'assets/images/review.png';
filterIcons[MemeFilter.DEAD] = 'assets/images/icon/dead.png';
filterIcons[MemeFilter.MYID] = 'assets/images/icon/1.png';