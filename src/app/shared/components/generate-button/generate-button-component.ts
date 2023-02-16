import { Component, Input } from "@angular/core";
import { MatButton } from "@angular/material/button";

@Component({
  selector: 'app-generate-button',
  templateUrl: './generate-button-component.html',
  styleUrls: ['./generate-button-component.sass'],
})
export class GenerateButtonComponent {
  @Input() buttonName: string = 'Button';
  @Input() isDisabled: boolean = false;
}
