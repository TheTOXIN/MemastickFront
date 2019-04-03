import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlComponent } from './control.component';
import {ControlScopeComponent} from './control-scope/control-scope.component';
import {ControlMenuComponent} from './control-menu/control-menu.component';
import {ControlEventsComponent} from './control-events/control-events.component';
import {ControlItemsComponent} from './control-items/control-items.component';
import {TokenModule} from '../token/token.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    ControlComponent,
    ControlScopeComponent,
    ControlMenuComponent,
    ControlEventsComponent,
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
