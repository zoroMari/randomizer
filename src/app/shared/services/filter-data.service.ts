import { Injectable } from "@angular/core";
import { PossibleLetters, TextStyle } from "../models/conditions-enums.model";

@Injectable({
  providedIn: 'root',
})
export class FilterDataService {
  private _letterConditions: string[] = [
    PossibleLetters.all,
    PossibleLetters.vowels,
    PossibleLetters.consonants,
    PossibleLetters.select,
  ]

  private _letterList: string[] = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];

  private _testStyle: string[] =[
    TextStyle.upper,
    TextStyle.lower,
    TextStyle.cap,
  ]

  get letterConditions() {
    return this._letterConditions;
  }

  get letterList() {
    return this._letterList;
  }

  get testStyle() {
    return this._testStyle;
  }
}
