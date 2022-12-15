import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { FilterService } from "src/app/shared/services/filter.service";

@Component({
  selector: 'app-naming',
  templateUrl: './naming-component.html',
  styleUrls: ['./naming-component.sass'],
})
export class NamingComponent implements OnInit {
  public letterList!: string[];
  public styleList!: string[];
  public form!: FormGroup;
  public wordGenerated: string = '---';

  constructor(private _filterService: FilterService) {}

  ngOnInit() {
    this.letterList = this._filterService.letterList;
    this.styleList = this._filterService.testStyle;
    this._formInitialization();
  }

  private _formInitialization() {
    this.form = new FormGroup({
      length: new FormControl('5', Validators.required),
      style: new FormControl(this.styleList[0], Validators.required),
      letters: new FormControl([this.letterList[0]], Validators.required),
      starts: new FormControl(''),
      includes: new FormControl(''),
      ends: new FormControl(''),
    })
  }

  public handleGenerateWord() {
    
    this.wordGenerated = 'New word'
  }
}
