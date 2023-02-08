import { NgModule } from "@angular/core";
import { GenerateButtonComponent } from "./generate-button-component";
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from "@angular/common";


@NgModule({
  declarations: [
    GenerateButtonComponent,
  ],
  imports: [
    MatButtonModule,
    CommonModule,
  ],
  exports: [
    GenerateButtonComponent,
  ],
})
export class GenerateButtonModule {

}
