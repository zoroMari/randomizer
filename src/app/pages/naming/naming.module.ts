import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModules } from "src/app/shared/modules/shared-modules.module";
import { TitleModule } from "src/app/shared/components/title/title.module";
import { WordGeneratedModule } from "src/app/shared/components/word-generated/word-generated.module";
import { NamingComponent } from "./naming.component";
import { GenerateButtonModule } from "src/app/shared/components/generate-button/generate-button.module";

@NgModule({
  declarations: [
    NamingComponent,
  ],
  imports: [
    SharedModules,
    TitleModule,
    WordGeneratedModule,
    GenerateButtonModule,
    RouterModule.forChild([{ path: '', component: NamingComponent }])
  ],
  exports: [
    RouterModule,
  ],
})
export class NamingModule {

}
