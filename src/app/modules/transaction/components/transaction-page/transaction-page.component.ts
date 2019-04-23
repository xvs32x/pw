import { Component, OnInit, ChangeDetectionStrategy, HostBinding } from '@angular/core';

@Component({
  selector: 'app-transaction-page',
  template: `
    <app-transaction-form #form></app-transaction-form>
    <app-transaction-list (repeat)="form.repeat($event)"></app-transaction-list>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionPageComponent implements OnInit {
  @HostBinding('class') cssClass = 'container container-large';

  constructor() { }

  ngOnInit() {
  }

}
