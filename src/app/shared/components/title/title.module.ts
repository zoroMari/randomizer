import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TitleComponent } from "./title.component";

@NgModule({
  declarations: [
    TitleComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    TitleComponent,
  ]
})
export class TitleModule {

}
