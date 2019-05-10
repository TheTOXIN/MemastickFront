import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TokenWalletComponent} from './token-wallet/token-wallet.component';
import {TokenAcceptComponent} from './token-accept/token-accept.component';
import {TokenAllowanceModalComponent} from './token-allowance-modal/token-allowance-modal.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    TokenWalletComponent,
    TokenAcceptComponent,
    TokenAllowanceModalComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    TokenWalletComponent,
    TokenAcceptComponent,
    TokenAllowanceModalComponent
  ],
  entryComponents: [
    TokenAllowanceModalComponent
  ]
})
export class TokenModule { }
