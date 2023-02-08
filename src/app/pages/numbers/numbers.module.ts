import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModules } from "src/app/shared/modules/shared-modules.module";
import { TitleModule } from "src/app/shared/components/title/title.module";
import { WordGeneratedModule } from "src/app/shared/components/word-generated/word-generated.module";
import { NumbersComponent } from "./numbers.component";
import { GenerateButtonModule } from "src/app/shared/components/generate-button/generate-button.module";

@NgModule({
  declarations: [
    NumbersComponent,
  ],
  imports: [
    SharedModules,
    TitleModule,
    WordGeneratedModule,
    GenerateButtonModule,
    RouterModule.forChild([{path: '', component: NumbersComponent}]),
  ],
  exports: [
    RouterModule,
  ]
})
export class NumbersModule {

}
