import { Component, OnInit } from '@angular/core';
import { Titles } from 'src/app/shared/models/titles-enums.model';
import { SavedService } from '../saved-list/saved-list.service';

@Component({
  selector: 'app-numbers',
  templateUrl: './numbers.component.html',
  styleUrls: ['./numbers.component.sass']
})
export class NumbersComponent implements OnInit {
  public title = Titles.numbers;

  constructor(
    private _savedService: SavedService,
  ) { }

  ngOnInit(): void {
    this._savedService.fetchSavedList(this.title);

  }

}


