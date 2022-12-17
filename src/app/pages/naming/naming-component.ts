import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { TextStyle } from "src/app/shared/models/conditions-enums.model";
import { FilterDataService } from "src/app/shared/services/filter-data.service";
import { FilterMethodService } from "src/app/shared/services/filter-method.service";

@Component({
  selector: 'app-naming',
  templateUrl: './naming-component.html',
  styleUrls: ['./naming-component.sass'],
})
export class NamingComponent implements OnInit {
  public letterConditions!: string[];
  public letterList!: string[];
  public styleList!: string[];
  public form!: FormGroup;
  public wordGenerated: string = '---';

  constructor(
    private _filterDataService: FilterDataService,
    private _filterMethodService: FilterMethodService,
  ) {}

  ngOnInit() {
    this._getFormOptions();
    this._formInitialization();
  }

  public handleGenerateWord() {
    const options = this._getValuesFromForm();
    const word: string[] = [];

    while (word.length < options.length) {
      let letter: string = this._filterMethodService.getRandomItemFromArray(options.letters);
      if (options.identicalLetters === false) {
        word.push(letter);
      } else {
        if (word.length > 0 && word[word.length - 1].toLocaleLowerCase() === letter.toLowerCase()) continue;
        else word.push(letter);
      }
    }

    this.wordGenerated = this._filterMethodService.styleOfWord(word.join(''), options.style);
  }

  private _getValuesFromForm() {
    const length: number = this.form.controls['length'].value;
    const style: TextStyle = this.form.controls['style'].value;
    const letters: string[] = this.form.controls['letters'].value;
    const identicalLetters: boolean = this.form.controls['identicalLetters'].value;

    return {
      length,
      style,
      letters,
      identicalLetters,
    }
  }

  private _formInitialization() {
    this.form = new FormGroup({
      length: new FormControl('5', Validators.required),
      style: new FormControl(this.styleList[0], Validators.required),
      letterCondition: new FormControl(this.letterConditions[0], Validators.required),
      letters: new FormControl([...this.letterList], Validators.required),
      identicalLetters: new FormControl(false),
      starts: new FormControl(''),
      includes: new FormControl(''),
      ends: new FormControl(''),
    })
  }

  private _getFormOptions() {
    this.letterConditions = this._filterDataService.letterConditions;
    this.letterList = this._filterDataService.letterList;
    this.styleList = this._filterDataService.testStyle;
  }
}
