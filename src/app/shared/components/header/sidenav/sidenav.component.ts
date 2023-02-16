import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.sass'],
})
export class SidenavComponent {
  @Output() onCloseMenu = new EventEmitter<boolean>();

  public handleCloseMenu() {
    this.onCloseMenu.emit(true);
  }
}
