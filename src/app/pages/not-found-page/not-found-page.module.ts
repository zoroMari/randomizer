import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TitleModule } from "src/app/shared/components/title/title.module";
import { NotFoundPageComponent } from "./not-found-page.component";

@NgModule({
  declarations: [
    NotFoundPageComponent,
  ],
  imports: [
    CommonModule,
    TitleModule,
    RouterModule.forChild([{ path: '', component: NotFoundPageComponent }]),
  ],
  exports: [
    RouterModule,
  ],
})
export class NotFoundPageModule {

}
