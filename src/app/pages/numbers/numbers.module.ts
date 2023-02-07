import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModules } from "src/app/shared/modules/shared-modules.module";
import { TitleModule } from "src/app/title/title.module";
import { WordGeneratedModule } from "src/app/word-generated/word-generated.module";
import { NumbersComponent } from "./numbers.component";

@NgModule({
  declarations: [
    NumbersComponent,
  ],
  imports: [
    SharedModules,
    TitleModule,
    WordGeneratedModule,
    RouterModule.forChild([{path: '', component: NumbersComponent}]),
  ],
  exports: [
    RouterModule,
  ]
})
export class NumbersModule {

}
