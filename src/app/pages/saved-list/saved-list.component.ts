import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Titles } from 'src/app/shared/models/titles-enums.model';
import { SavedService } from './saved-list.service';

@Component({
  selector: 'app-saved-list',
  templateUrl: './saved-list.component.html',
  styleUrls: ['./saved-list.component.sass']
})
export class SavedListComponent implements OnInit {
  constructor(private _savedService: SavedService, private _route: ActivatedRoute) { }

  public title = Titles.saved;
  public savedList!: string[];
  public noSaved: boolean = false;

  ngOnInit(): void {
    this._route.params.subscribe(
      (param: Params) => {
        this._savedService.fetchSavedList(param['title']);
        this.savedList = this._savedService.savedList;
      }
    )

    this._savedService.savedListChanged.subscribe(
      (value) => {
        if (this._savedService.savedList.length === 0) this.noSaved = true;
        else this.noSaved === false;

        this.savedList = this._savedService.savedList;
      }
    )
  }

  public handleDeleteWord(word: string): void {
    this._savedService.deleteWord(word);
  }

  public handleDeleteAllWords(): void {
    this._savedService.deleteAllWords();
  }

}
