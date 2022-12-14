import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TitleModule } from "src/app/title/title.module";
import { AboutComponent } from "./about.component";

@NgModule({
  declarations: [
    AboutComponent,
  ],
  imports: [
    CommonModule,
    TitleModule,
    RouterModule.forChild([{ path: '', component: AboutComponent }]),
  ],
  exports: [
    RouterModule,
  ],
})
export class AboutModule {

}
