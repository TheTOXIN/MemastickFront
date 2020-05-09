import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './home.component';
import {SettingsComponent} from './settings/settings.component';
import {LibraryComponent} from './library/library.component';
import {MiningComponent} from './mining/mining.component';

const routes: Routes = [
  {
    path: 'home',
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      },
      {
        path: 'library',
        component: LibraryComponent
      },
      {
        path: 'mining',
        component: MiningComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {

}
