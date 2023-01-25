import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { WordGeneratedComponent } from "./word-generated.component";
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    WordGeneratedComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
  ],
  exports: [
    WordGeneratedComponent,
  ]
})
export class WordGeneratedModule {

}
