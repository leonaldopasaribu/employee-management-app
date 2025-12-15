import { Component, ElementRef } from '@angular/core';
import { AppMenu } from '../app-menu';

@Component({
  selector: 'app-sidebar',
  templateUrl: './app-sidebar.html',
  imports: [AppMenu],
})
export class AppSidebar {
  constructor(public el: ElementRef) {}
}
