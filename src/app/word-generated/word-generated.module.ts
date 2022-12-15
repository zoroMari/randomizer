import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { WordGeneratedComponent } from "./word-generated.component";

@NgModule({
  declarations: [
    WordGeneratedComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    WordGeneratedComponent,
  ]
})
export class WordGeneratedModule {

}
