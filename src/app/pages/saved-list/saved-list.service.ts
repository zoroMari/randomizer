import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class SavedService {
  public savedListChanged = new BehaviorSubject<string []>([]);
  private _savedList: string [] = [];
  private _title!: string;

  public get savedList() {
    return this._savedList;
  }

  public saveWord(word: string, nameOfList: string): void {
    this._savedList.push(word);
    this.savedListChanged.next(this._savedList);

    localStorage.setItem(nameOfList, JSON.stringify(this._savedList))
  }

  public fetchSavedList(nameOfList: string): void {
    this._title = nameOfList;

    if (!localStorage.getItem(nameOfList)) return;
    else {
      this._savedList = JSON.parse(localStorage.getItem(nameOfList) as string);
      this.savedListChanged.next(this._savedList);
    }
  }

  public deleteWord(word: string): void {
    const index = this._savedList.findIndex((item) => item === word);
    this._savedList.splice(index, 1);

    this.savedListChanged.next(this._savedList);

    localStorage.setItem(this._title, JSON.stringify(this._savedList))

  }

  public deleteAllWords(): void {
    this._savedList.length = 0;

    this.savedListChanged.next(this._savedList);

    localStorage.setItem(this._title, JSON.stringify(this._savedList))

  }
}
