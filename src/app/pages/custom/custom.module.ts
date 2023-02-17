import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { GenerateButtonModule } from "src/app/shared/components/generate-button/generate-button.module";
import { TitleModule } from "src/app/shared/components/title/title.module";
import { WordGeneratedModule } from "src/app/shared/components/word-generated/word-generated.module";
import { SharedModules } from "src/app/shared/modules/shared-modules.module";
import { CustomComponent } from "./custom.component";


@NgModule({
  declarations: [
    CustomComponent,
  ],
  imports: [
    SharedModules,
    TitleModule,
    WordGeneratedModule,
    GenerateButtonModule,
    RouterModule.forChild([{ path: '', component: CustomComponent }]),
  ],
  exports: [
    RouterModule,
  ]
})
export class CustomModule {

}
