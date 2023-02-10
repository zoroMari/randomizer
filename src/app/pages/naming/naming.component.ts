import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subject, Subscription } from "rxjs";
import { LettersAvailable, TextStyle } from "src/app/shared/models/conditions-enums.model";
import { NamingFilterDataService } from "src/app/shared/services/naming-filter-data.service";
import { FilterMethodService } from "src/app/shared/services/filter-method.service";
import { Titles } from "src/app/shared/models/titles-enums.model";
import { SavedService } from "../saved-list/saved-list.service";
import { IArgsForGenerateFunction, NamingSevice } from "./naming.service";

@Component({
  selector: 'app-naming',
  templateUrl: './naming.component.html',
  styleUrls: ['./naming.component.sass'],
})
export class NamingComponent implements OnInit, OnDestroy {
  public title = Titles.naming;
  public form!: FormGroup;
  public wordGenerated: string = '---';
  public saved = false;

  public lettersAvailableAll!: string[];
  public letterList!: string[];
  public styleList!: string[];
  public possibleLettersDisable = true;

  public wordMinLength = new Subject<number>();

  private _sub!: Subscription;

  constructor(
    private _filterDataService: NamingFilterDataService,
    private _filterMethodService: FilterMethodService,
    private _savedService: SavedService,
    private _namingService: NamingSevice,
  ) {}

  ngOnInit() {
    this._getFormOptions();
    this._formInitialization();
    this.form.controls['minLength'].markAsTouched();
    this.form.controls['maxLength'].markAsTouched();
    this._savedService.fetchSavedList(this.title);

    this._sub = this.form.controls['lettersAvailable'].valueChanges.subscribe(
      (value: LettersAvailable) => {
        this.possibleLettersDisable = value !== LettersAvailable.select;
        const letterSelectedField = this.form.controls['lettersSelected'];
        const lettersSelected: string[] = Array.from(this._filterMethodService.filterLetters(
          value, this._filterDataService.letterList, this.form.controls['lettersSelected'].value)
        );

        if (value !== LettersAvailable.select) {
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
          if (this.form.controls['lettersAvailable'].value === LettersAvailable.select && value.length < 2) {
            this.form.controls['identicalLetters'].disable();
          } else this.form.controls['identicalLetters'].enable();
        }
      )
    )

    this._sub.add(
      this.form.controls['starts'].valueChanges.subscribe(
        (starts) => {
          this.wordMinLength.next(starts.trim()?.length + this.form.controls['includes'].value.trim()?.length + this.form.controls['ends'].value.trim()?.length);
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
      this.form.controls['minLength'].valueChanges.subscribe(
        (min) => {
          this.form.controls['maxLength'].setValidators([Validators.required, Validators.min(min)]);
          this.form.controls['maxLength'].updateValueAndValidity();
        }
      )
    )

    this._sub.add(
      this.wordMinLength.subscribe(
        (value) => {
          this.form.controls['minLength'].setValidators([Validators.required, Validators.min(value)]);
          this.form.controls['minLength'].updateValueAndValidity();
          this.form.controls['maxLength'].setValidators([Validators.required, Validators.min(value)]);
          this.form.controls['maxLength'].updateValueAndValidity();
        }
      )
    )
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
    this._savedService.setSavedListEmpty = [];
  }

  public handleGenerateWord() {
    if (this.form.invalid) return;
    this.saved = false;
    const options = this._getValuesFromForm();

    const args: IArgsForGenerateFunction = {
      form: this.form,
      options: options,
      startPart: options.start,
      includePart: options.includes,
      endPart: options.ends,
    }

    this.wordGenerated = this._namingService.generateWord(args);
  }

  public handleSaveWord() {
    this.saved = true;
    this._savedService.saveWord(this.wordGenerated, this.title);
  }

  private _getValuesFromForm() {
    const minLength: number = this.form.controls['minLength'].value;
    const maxLength: number = this.form.controls['maxLength'].value;
    const style: TextStyle = this.form.controls['style'].value;
    const identicalLetters: boolean = this.form.controls['identicalLetters'].value;
    const lettersAvailable: LettersAvailable = this.form.controls['lettersAvailable'].value;
    const lettersSelected: string[] = Array.from(this._filterMethodService.filterLetters(
      lettersAvailable, this._filterDataService.letterList, this.form.controls['lettersSelected'].value)
    );
    const start: string = this.form.controls['starts'].value.trim();
    const includes: string = this.form.controls['includes'].value.trim();
    const ends: string = this.form.controls['ends'].value.trim();

    return {
      minLength,
      maxLength,
      style,
      lettersAvailable,
      lettersSelected,
      identicalLetters,
      start,
      includes,
      ends,
    }
  }

  private _formInitialization() {
    this.form = new FormGroup({
      minLength: new FormControl('5', [Validators.required]),
      maxLength: new FormControl('5', [Validators.required]),
      style: new FormControl(this.styleList[0], Validators.required),
      lettersAvailable: new FormControl(this.lettersAvailableAll[0], Validators.required),
      lettersSelected: new FormControl({ value: [], disabled: this.possibleLettersDisable }, Validators.required),
      identicalLetters: new FormControl(false),
      starts: new FormControl(''),
      includes: new FormControl(''),
      ends: new FormControl(''),
    })
  }

  private _getFormOptions() {
    this.lettersAvailableAll = this._filterDataService.lettersAvailable;
    this.letterList = Array.from(this._filterDataService.letterList.toUpperCase());
    this.styleList = this._filterDataService.textStyle;
  }
}
