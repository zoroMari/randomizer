import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private _letterList: string[] = [
    'All letters',
    'Only vowels',
    'Only consonants',
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
    'Uppercase',
    'Lowercase',
    'Capitalize',
  ]

  get letterList() {
    return this._letterList;
  }

  get testStyle() {
    return this._testStyle;
  }
}
