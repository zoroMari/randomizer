import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.sass'],
})
export class NavigationComponent {

  @Output() onOpenMenu = new EventEmitter<boolean>();

  public handleOpenMenu() {
    this.onOpenMenu.emit(true);
  }
}
