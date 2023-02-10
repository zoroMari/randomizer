import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'randomizer';
  public isOpen = false;

  public handleCloseMenu(isClosed: boolean) {
    this.isOpen = !isClosed;
  }

  public handleOpenMenu(isOpen: boolean) {
    this.isOpen = isOpen;
  }
}
