import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NumbersAvailable } from 'src/app/shared/models/conditions-enums.model';
import { Titles } from 'src/app/shared/models/titles-enums.model';
import { SavedService } from '../saved-list/saved-list.service';

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
    NumbersAvailable.odd
  ];
  private _sub!: Subscription;

  constructor(
    private _savedService: SavedService,
  ) { }

  ngOnInit(): void {
    this._savedService.fetchSavedList(this.title);
    this._formInitialization();


  }

  ngOnDestroy(): void {
    // this._sub.unsubscribe();
    this._savedService.setSavedListEmpty = [];
  }

  public handleGenerateNumber() {
    if (this.form.invalid) return;
    this.saved = false;
    const options = this._getValuesFromForm();
    this.generatedNum = '5';
  }

  public handleSaveNumber() {
    this.saved = true;
    this._savedService.saveWord(this.generatedNum, this.title);
  }

  private _getValuesFromForm() {
    const min: number = this.form.controls['min'].value;
    const max: number = this.form.controls['max'].value;
    const availableNum: NumbersAvailable = this.form.controls['availableNum'].value;
    const onlyPrime: boolean = this.form.controls['prime'].value;
    return {
      min,
      max,
      availableNum,
      onlyPrime,
    }
  }

  private _formInitialization() {
    this.form = new FormGroup({
      min: new FormControl(0, Validators.required),
      max: new FormControl(100, Validators.required),
      availableNum: new FormControl(this.numAvailable[0]),
      prime: new FormControl(false),
    })
  }


}
