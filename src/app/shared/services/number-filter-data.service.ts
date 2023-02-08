import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class NumberFilterDataService {

  get numbersList() {
    return this._numberList;
  }

  private _numberList: string = '0123456789';

}
