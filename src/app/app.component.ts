import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-toolbar>{{title}}</app-toolbar>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'Parrot Wings';
}
