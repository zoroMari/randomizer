import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModules } from "src/app/shared/modules/shared-modules.module";
import { TitleModule } from "src/app/title/title.module";
import { WordGeneratedModule } from "src/app/word-generated/word-generated.module";
import { NamingComponent } from "./naming-component";

@NgModule({
  declarations: [
    NamingComponent,
  ],
  imports: [
    SharedModules,
    TitleModule,
    WordGeneratedModule,
    RouterModule.forChild([{ path: '', component: NamingComponent }])
  ],
  exports: [
    RouterModule,
  ],
})
export class NamingModule {

}
