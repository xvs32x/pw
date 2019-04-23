import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionPageComponent } from './components/transaction-page/transaction-page.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }
