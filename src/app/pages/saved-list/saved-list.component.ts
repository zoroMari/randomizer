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
  constructor(private _savedService: SavedService, public route: ActivatedRoute) { }

  public title: string = Titles.saved;
  public savedList!: string[];
  public noSaved: boolean = false;

  ngOnInit(): void {
    this.route.params.subscribe(
      (param: Params) => {
        this.title = `${Titles.saved} (${param['title']})`;
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

  public onDownload(){
    this._download(this.savedList, "saved-list.txt");
  }

  public handleDeleteWord(word: string): void {
    this._savedService.deleteWord(word);
  }

  public handleDeleteAllWords(): void {
    this._savedService.deleteAllWords();
  }

  private _download(content: string [], fileName: string) {
    const a = document.createElement("a");
    const file = new Blob([`${content}`], { type: 'text/plain' });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

}
