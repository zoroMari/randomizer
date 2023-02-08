import { Injectable } from "@angular/core";
import { LettersAvailable, TextStyle } from "../models/conditions-enums.model";

@Injectable({
  providedIn: 'root',
})
export class NamingFilterDataService {
  get lettersAvailable() {
    return this._lettersAvailable;
  }

  get letterList() {
    return this._letterList;
  }

  get textStyle() {
    return this._textStyle;
  }

  private _lettersAvailable: string[] = [
    LettersAvailable.all,
    LettersAvailable.vowels,
    LettersAvailable.consonants,
    LettersAvailable.select,
  ]

  private _letterList: string = 'abcdefghijklmnopqrstuvwxyz';

  private _textStyle: string[] =[
    TextStyle.upper,
    TextStyle.lower,
    TextStyle.cap,
  ]


}
