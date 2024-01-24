import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { ObjectDropdownComponent } from './object-dropdown/object-dropdown.component';
import { CheckOuthComponent } from './check-outh/check-outh.component';
import { OauthComponent } from './oauth/oauth.component';
import { Err404Component } from './err404/err404.component';

const routes: Routes = [
  {
    path: '',
    component: CheckOuthComponent
  },
  {
    path: 'oauth',
    component: OauthComponent
  },
  {
    path: 'home',
    component: ObjectDropdownComponent
  },
  {
    path: '**',
    component: Err404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
