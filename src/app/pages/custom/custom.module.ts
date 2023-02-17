import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
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
    RouterModule.forChild([{ path: '', component: CustomComponent }]),
  ],
  exports: [
    RouterModule,
  ]
})
export class CustomModule {

}
