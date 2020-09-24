import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ControlComponent} from './control.component';
import {ControlScopeComponent} from './control-scope/control-scope.component';
import {ControlMenuComponent} from './control-menu/control-menu.component';
import {ControlBellsComponent} from './control-bells/control-bells.component';
import {ControlItemsComponent} from './control-items/control-items.component';
import {TokenModule} from '../token/token.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    ControlComponent,
    ControlScopeComponent,
    ControlMenuComponent,
    ControlBellsComponent,
    ControlItemsComponent
  ],
  imports: [
    CommonModule,
    TokenModule,
    SharedModule
  ],
  exports: [
    ControlComponent
  ]
})
export class ControlModule { }
