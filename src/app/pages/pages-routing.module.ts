import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {ForgetPasswordComponent} from './forget-password/forget-password.component';
import {InviteRegComponent} from './invite-reg/invite-reg.component';
import {ReviewComponent} from './review/review.component';
import {FaqComponent} from './faq/faq.component';
import {DownloadComponent} from './download/download.component';
import {ComingSoonComponent} from './coming-soon/coming-soon.component';
import {RequestFormComponent} from './request-form/request-form.component';
import {AdminComponent} from './admin/admin.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'invite',
        component: InviteRegComponent,
      },
      {
        path: 'sign-in',
        component: SignInComponent,
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
      },
      {
        path: 'forget-password',
        component: ForgetPasswordComponent,
      },
      {
        path: 'review',
        component: ReviewComponent,
      },
      {
        path: 'faq',
        component: FaqComponent,
      },
      {
        path: 'download',
        component: DownloadComponent,
      },
      {
        path: 'coming-soon',
        component: ComingSoonComponent,
      },
      {
        path: 'request',
        component: RequestFormComponent,
      },
      {
        path: 'admin',
        component: AdminComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
