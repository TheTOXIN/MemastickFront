import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {HomeRoutingModule} from './home-routing.modules';
import {SharedModule} from '../shared/shared.module';
import {ModalsModule} from '../modals/modals.module';
import {ControlModule} from '../control/control.module';
import {SettingsComponent} from './settings/settings.component';
import {LibraryComponent} from './library/library.component';
import {StartModule} from '../start/start.module';
import {TokenModule} from '../token/token.module';
import {MiningComponent} from './mining/mining.component';
import {HomeParticlesComponent} from './home-particles/home-particles.component';
import {MemetickModule} from '../memetick/memetick.module';
import {HomeMemetickComponent} from './home-memetick/home-memetick.component';
import {HomeChatComponent} from './home-chat/home-chat.component';
import {ChatModule} from '../chat/chat.module';
import {DirectivesModule} from '../directivies/directives.module';
import {HomeCreateBtnComponent} from './home-create-btn/home-create-btn.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    ModalsModule,
    ControlModule,
    StartModule,
    TokenModule,
    MemetickModule,
    ChatModule,
    DirectivesModule
  ],
  declarations: [
    HomeComponent,
    SettingsComponent,
    LibraryComponent,
    MiningComponent,
    HomeParticlesComponent,
    HomeMemetickComponent,
    HomeChatComponent,
    HomeCreateBtnComponent
  ]
})
export class HomeModule { }
