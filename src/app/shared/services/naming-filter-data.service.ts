import { Injectable } from "@angular/core";
import { PossibleLetters, TextStyle } from "../models/conditions-enums.model";

@Injectable({
  providedIn: 'root',
})
export class NamingFilterDataService {
  get letterConditions() {
    return this._letterConditions;
  }

  get letterList() {
    return this._letterList;
  }

  get textStyle() {
    return this._textStyle;
  }

  private _letterConditions: string[] = [
    PossibleLetters.all,
    PossibleLetters.vowels,
    PossibleLetters.consonants,
    PossibleLetters.select,
  ]

  private _letterList: string = 'abcdefghijklmnopqrstuvwxyz';

  private _textStyle: string[] =[
    TextStyle.upper,
    TextStyle.lower,
    TextStyle.cap,
  ]


}
