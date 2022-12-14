import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModules } from "src/app/shared/shared-modules.module";
import { NamingComponent } from "./naming-component";

@NgModule({
  declarations: [
    NamingComponent,
  ],
  imports: [
    SharedModules,
    RouterModule.forChild([{ path: '', component: NamingComponent }])
  ],
  exports: [
    RouterModule,
  ],
})
export class NamingModule {

}
