import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLoginFormComponent } from './components/auth-login-form/auth-login-form.component';
import { AuthRegisterFormComponent } from './components/auth-register-form/auth-register-form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
  },
  {
    path: 'login',
    component: AuthLoginFormComponent
  },
  {
    path: 'register',
    component: AuthRegisterFormComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
