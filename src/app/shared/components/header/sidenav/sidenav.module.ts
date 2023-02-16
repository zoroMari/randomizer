import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SidenavComponent } from "./sidenav.component";
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [
    SidenavComponent,
  ],
  imports: [
    CommonModule,
    MatListModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [
    SidenavComponent,
    MatListModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class SidenavModule {

}
