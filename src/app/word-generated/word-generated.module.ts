import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { WordGeneratedComponent } from "./word-generated.component";
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    WordGeneratedComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,

  ],
  exports: [
    WordGeneratedComponent,
  ]
})
export class WordGeneratedModule {

}
