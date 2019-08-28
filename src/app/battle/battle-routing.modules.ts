import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {BattleComponent} from './battle.component';
import {BattleArenaComponent} from './battle-arena/battle-arena.component';
import {BattleRatingComponent} from './battle-rating/battle-rating.component';


const routes: Routes = [
  {
    path: 'battle',
    children: [{
        path: '',
        component: BattleComponent
    }, {
      path: 'arena',
      component: BattleArenaComponent
    }, {
      path: 'rating',
      component: BattleRatingComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BattleRoutingModules {

}
