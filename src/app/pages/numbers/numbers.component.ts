import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NumbersAvailable } from 'src/app/shared/models/conditions-enums.model';
import { Titles } from 'src/app/shared/models/titles-enums.model';
import { FilterMethodService } from 'src/app/shared/services/filter-method.service';
import { SavedService } from '../saved-list/saved-list.service';
import { INumbersFilterInputs, NumberService } from './numbers.service';

@Component({
  selector: 'app-numbers',
  templateUrl: './numbers.component.html',
  styleUrls: ['./numbers.component.sass']
})
export class NumbersComponent implements OnInit, OnDestroy {
  public title = Titles.numbers;
  public form!: FormGroup;
  public saved!: boolean;
  public generatedNum = '---';
  public numAvailable: NumbersAvailable[] = [
    NumbersAvailable.all,
    NumbersAvailable.even,
    NumbersAvailable.odd,
    NumbersAvailable.prime,
  ];
  private _sub!: Subscription;

  constructor(
    private _savedService: SavedService,
    private _filterMethodService: FilterMethodService,
    private _numbersService: NumberService,
  ) { }

  ngOnInit(): void {
    this._savedService.fetchSavedList(this.title);
    this._formInitialization();
    this.form.controls['max'].markAsTouched();

    this._sub = this.form.controls['min'].valueChanges.subscribe(
      (value) => {
        if (value >= this.form.controls['max'].value) {
          this.form.controls['max'].setValidators([Validators.required, Validators.min(value + 1)]);
          this.form.controls['max'].updateValueAndValidity();
        }
      }
    )
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
    this._savedService.setSavedListEmpty = [];
  }

  public handleGenerateNumber() {
    if (this.form.invalid) return;
    this.saved = false;

    const options: INumbersFilterInputs = this._getValuesFromForm();

    this.generatedNum = this._numbersService.handleGenerateNumber(options);
  }

  public handleSaveNumber() {
    this.saved = true;
    this._savedService.saveWord(this.generatedNum, this.title);
  }

  private _getValuesFromForm() :INumbersFilterInputs {
    const min: number = this.form.controls['min'].value;
    const max: number = this.form.controls['max'].value;
    const availableNum: NumbersAvailable = this.form.controls['availableNum'].value;
    return {
      min,
      max,
      availableNum,
    }
  }

  private _formInitialization() {
    this.form = new FormGroup({
      min: new FormControl(0, Validators.required),
      max: new FormControl(100, Validators.required),
      availableNum: new FormControl(this.numAvailable[0]),
    })
  }
}
