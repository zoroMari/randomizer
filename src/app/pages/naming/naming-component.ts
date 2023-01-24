import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subject, Subscription } from "rxjs";
import { PossibleLetters, TextStyle } from "src/app/shared/models/conditions-enums.model";
import { NamingFilterDataService } from "src/app/shared/services/naming-filter-data.service";
import { FilterMethodService } from "src/app/shared/services/filter-method.service";

@Component({
  selector: 'app-naming',
  templateUrl: './naming-component.html',
  styleUrls: ['./naming-component.sass'],
})
export class NamingComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  public wordGenerated: string = '---';

  public letterConditionsAll!: string[];
  public letterList!: string[];
  public styleList!: string[];
  public possibleLettersDisable = true;

  public wordMinLength = new Subject<number>();

  private _sub!: Subscription;

  constructor(
    private _filterDataService: NamingFilterDataService,
    private _filterMethodService: FilterMethodService,
  ) {}

  ngOnInit() {
    this._getFormOptions();
    this._formInitialization();

    this._sub = this.form.controls['letterCondition'].valueChanges.subscribe(
      (value: PossibleLetters) => {
        this.possibleLettersDisable = value !== PossibleLetters.select;
        const letterSelectedField = this.form.controls['lettersSelected'];
        const lettersSelected: string[] = Array.from(this._filterMethodService.filterLetters(
          value, this._filterDataService.letterList, this.form.controls['lettersSelected'].value)
        );

        if (value !== PossibleLetters.select) {
          letterSelectedField.disable();
          letterSelectedField.setValue(lettersSelected);
        } else {
          letterSelectedField.enable();
          letterSelectedField.setValue([]);
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

    this._sub.add(
      this.form.controls['starts'].valueChanges.subscribe(
        (starts) => {
          this.wordMinLength.next(starts.trim().length + this.form.controls['includes'].value.trim().length + this.form.controls['ends'].value.trim().length);
        }
      )
    )

    this._sub.add(
      this.form.controls['includes'].valueChanges.subscribe(
        (includes) => this.wordMinLength.next(includes.trim().length + this.form.controls['starts'].value.trim().length + this.form.controls['ends'].value.trim().length)
      )
    )

    this._sub.add(
      this.form.controls['ends'].valueChanges.subscribe(
        (ends) => this.wordMinLength.next(ends.trim().length + this.form.controls['starts'].value.trim().length + this.form.controls['includes'].value.trim().length)
      )
    )

    this._sub.add(
      this.wordMinLength.subscribe(
        (value) => {
          this.form.controls['length'].setValidators([Validators.required, Validators.min(value)]);
          this.form.controls['length'].updateValueAndValidity();
        }
      )
    )
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  public handleGenerateWord() {
    const options = this._getValuesFromForm();
    const start = [...options.start];
    const end = [...options.ends];
    const include = options.includes;
    let mediumPart: string[] = [];
    const word: string[] = [];

    if (this.form.invalid) return;

    word.push(...options.start, ...options.includes, ...options.ends);

    const maxGeneratedLength = options.length - word.length;

    if (options.includes.length === 0) {
      const generatedPart = [];

      while (generatedPart.length < maxGeneratedLength) {
        let letter: string = this._filterMethodService.getRandomItemFromArray(options.lettersSelected);

        if (options.identicalLetters === false) generatedPart.push(letter);
        else {
          if (
            generatedPart.length === 0 &&
            start.length > 0 &&
            start[start.length - 1].toLowerCase() === letter.toLowerCase()
          ) continue;

          else if (
            generatedPart.length > 0 &&
            generatedPart[generatedPart.length - 1].toLowerCase() === letter.toLowerCase()
          ) continue;

          else if (
            generatedPart.length === maxGeneratedLength - 1 &&
            end.length > 0 &&
            end[0].toLowerCase() === letter.toLowerCase()
          ) continue;

          else generatedPart.push(letter);
        }
      }

      mediumPart = [...generatedPart];

    } else {
      const generatedPart = [];
      const lastIndexOfPartBeforeInclude = Math.floor(maxGeneratedLength / 2) - 1;
      const firstIndexofPartAfterInclude = Math.floor(maxGeneratedLength / 2);

      console.log(' lastIndexOfPartBeforeInclude>>>', lastIndexOfPartBeforeInclude);
      console.log(' firstIndexofPartAfterInclude>>>', firstIndexofPartAfterInclude);


      while (generatedPart.length < maxGeneratedLength) {
        let letter: string = this._filterMethodService.getRandomItemFromArray(options.lettersSelected);


        if (options.identicalLetters === false) generatedPart.push(letter);
        else {
          if (
            generatedPart.length === 0 &&
            start.length > 0 &&
            (
              start[start.length - 1].toLowerCase() === letter.toLowerCase() ||
              include[0].toLowerCase() === letter.toLowerCase()
            )
          ) continue;

          else if (
            generatedPart.length > 0 &&
            generatedPart[generatedPart.length - 1].toLowerCase() === letter.toLowerCase()
          ) continue;

          else if (
            generatedPart.length === lastIndexOfPartBeforeInclude &&
            letter.toLowerCase() === include[0].toLowerCase()
          ) continue;

          else if (
            generatedPart.length === maxGeneratedLength - 1 &&
            end.length > 0 &&
            end[0].toLowerCase() === letter.toLowerCase()
          ) continue;

          else if (
            generatedPart.length === firstIndexofPartAfterInclude &&
            letter.toLowerCase() === include[include.length - 1].toLowerCase()
          ) continue;

          else generatedPart.push(letter);
        }
      }

      const firstPart = generatedPart.slice(0, lastIndexOfPartBeforeInclude + 1);
      const secondPart = generatedPart.slice(firstIndexofPartAfterInclude);

      mediumPart = [...firstPart, ...include, ...secondPart];
    }

    const newWord = [...start, ...mediumPart, ...end];
    this.wordGenerated = this._filterMethodService.addStyleToWord(newWord.join(''), options.style);
  }

  private _getValuesFromForm() {
    const length: number = this.form.controls['length'].value;
    const style: TextStyle = this.form.controls['style'].value;
    const identicalLetters: boolean = this.form.controls['identicalLetters'].value;
    const lettersCondition: PossibleLetters = this.form.controls['letterCondition'].value;
    const lettersSelected: string[] = Array.from(this._filterMethodService.filterLetters(
      lettersCondition, this._filterDataService.letterList, this.form.controls['lettersSelected'].value)
    );
    const start: string = this.form.controls['starts'].value.trim();
    const includes: string = this.form.controls['includes'].value.trim();
    const ends: string = this.form.controls['ends'].value.trim();

    return {
      length,
      style,
      lettersCondition,
      lettersSelected,
      identicalLetters,
      start,
      includes,
      ends,
    }
  }

  private _formInitialization() {
    this.form = new FormGroup({
      length: new FormControl('5', [Validators.required]),
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
}
