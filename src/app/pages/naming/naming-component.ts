import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { PossibleLetters, TextStyle } from "src/app/shared/models/conditions-enums.model";
import { FilterDataService } from "src/app/shared/services/filter-data.service";
import { FilterMethodService } from "src/app/shared/services/filter-method.service";

@Component({
  selector: 'app-naming',
  templateUrl: './naming-component.html',
  styleUrls: ['./naming-component.sass'],
})
export class NamingComponent implements OnInit, OnDestroy {
  private _sub!: Subscription;
  public letterConditionsAll!: string[];
  public letterList!: string[];
  public styleList!: string[];
  public form!: FormGroup;
  public wordGenerated: string = '---';
  public possibleLettersDisable = true;

  constructor(
    private _filterDataService: FilterDataService,
    private _filterMethodService: FilterMethodService,
  ) {}

  ngOnInit() {
    this._getFormOptions();
    this._formInitialization();

    this._sub = this.form.controls['letterCondition'].valueChanges.subscribe(
      (value: PossibleLetters) => {
        this.possibleLettersDisable = value !== PossibleLetters.select;
        const letterSelected = this.form.controls['lettersSelected'];
        const lettersSelected: string[] = Array.from(this._filterMethodService.filterLetters(
          value, this._filterDataService.letterList, this.form.controls['lettersSelected'].value)
        );

        if (value !== PossibleLetters.select) {
          letterSelected.disable();
          letterSelected.setValue(lettersSelected);
        } else {
          letterSelected.enable();
          letterSelected.setValue([]);
        }
      }
    )

    this._sub.add(
      this.form.controls['lettersSelected'].valueChanges.subscribe(
        (value) => {
          if (this.form.controls['letterCondition'].value === PossibleLetters.select && value.length < 2) {
            this.form.controls['identicalLetters'].disable();
          } else this.form.controls['identicalLetters'].enable();
        }
      )
    )
  }

  public handleGenerateWord() {
    const options = this._getValuesFromForm();
    const word: string[] = [];

    while (word.length < options.length) {
      let letter: string = this._filterMethodService.getRandomItemFromArray(options.lettersSelected);
      if (options.identicalLetters === false) {
        word.push(letter);
      } else {
        if (word.length > 0 && word[word.length - 1].toLocaleLowerCase() === letter.toLowerCase()) continue;
        else word.push(letter);
      }
    }

    this.wordGenerated = this._filterMethodService.addStyleToWord(word.join(''), options.style);
  }

  private _getValuesFromForm() {
    const length: number = this.form.controls['length'].value;
    const style: TextStyle = this.form.controls['style'].value;
    const identicalLetters: boolean = this.form.controls['identicalLetters'].value;
    const lettersCondition: PossibleLetters = this.form.controls['letterCondition'].value;
    const lettersSelected: string[] = Array.from(this._filterMethodService.filterLetters(
      lettersCondition, this._filterDataService.letterList, this.form.controls['lettersSelected'].value)
    );

    return {
      length,
      style,
      lettersCondition,
      lettersSelected,
      identicalLetters,
    }
  }

  private _formInitialization() {
    this.form = new FormGroup({
      length: new FormControl('5', Validators.required),
      style: new FormControl(this.styleList[0], Validators.required),
      letterCondition: new FormControl(this.letterConditionsAll[0], Validators.required),
      lettersSelected: new FormControl({ value: [], disabled: this.possibleLettersDisable }, Validators.required),
      identicalLetters: new FormControl(false),
      starts: new FormControl(''),
      includes: new FormControl(''),
      ends: new FormControl(''),
    })
  }

  private _getFormOptions() {
    this.letterConditionsAll = this._filterDataService.letterConditions;
    this.letterList = Array.from(this._filterDataService.letterList.toUpperCase());
    this.styleList = this._filterDataService.textStyle;
  }

  ngOnDestroy(): void {
      this._sub.unsubscribe();
  }
}
