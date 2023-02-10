import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SidenavComponent } from "./sidenav.component";
import {MatListModule} from '@angular/material/list';
import { RouterModule } from "@angular/router";



@NgModule({
  declarations: [
    SidenavComponent,
  ],
  imports: [
    CommonModule,
    MatListModule,
    RouterModule,
  ],
  exports: [
    SidenavComponent,
    MatListModule,
  ],
})
export class SidenavModule {

}
