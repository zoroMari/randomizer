import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModules } from "src/app/shared/modules/shared-modules.module";
import { SavedListComponent } from "./saved-list.component";

@NgModule({
  declarations: [SavedListComponent],
  imports: [
    SharedModules,
    RouterModule.forChild([{ path: '', component: SavedListComponent}]),
  ],
  exports: [
    RouterModule,
  ],
})
export class SavedListModule {

}
