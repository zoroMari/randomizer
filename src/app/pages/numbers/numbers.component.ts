import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NumbersAvailable } from 'src/app/shared/models/conditions-enums.model';
import { Titles } from 'src/app/shared/models/titles-enums.model';
import { SavedService } from '../saved-list/saved-list.service';

@Component({
  selector: 'app-numbers',
  templateUrl: './numbers.component.html',
  styleUrls: ['./numbers.component.sass']
})
export class NumbersComponent implements OnInit {
  public title = Titles.numbers;
  public form!: FormGroup;

  public numAvailable: NumbersAvailable[] = [
    NumbersAvailable.all,
    NumbersAvailable.even,
    NumbersAvailable.odd
  ];

  constructor(
    private _savedService: SavedService,
  ) { }

  ngOnInit(): void {
    this._savedService.fetchSavedList(this.title);
    this._formInitialization();
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
