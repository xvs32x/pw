import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionRoutingModule } from './transaction-routing.module';
import { TransactionPageComponent } from './components/transaction-page/transaction-page.component';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [TransactionPageComponent, TransactionFormComponent, TransactionListComponent],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    SharedModule,
    MatTableModule,
    MatSortModule,
    MatIconModule
  ]
})
export class TransactionModule { }
