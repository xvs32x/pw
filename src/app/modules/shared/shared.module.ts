import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ErrorComponent } from './components/error/error.component';
import { MatButtonModule, MatToolbarModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { UserInfoComponent } from './components/user-info/user-info.component';

@NgModule({
  declarations: [
    ToolbarComponent,
    ErrorComponent,
    UserInfoComponent
  ],
  exports: [
    ToolbarComponent,
    ErrorComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
  ]
})
export class SharedModule { }
