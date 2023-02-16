import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { NumbersAvailable } from "src/app/shared/models/conditions-enums.model";
import { FilterMethodService } from "src/app/shared/services/filter-method.service";


export interface INumbersFilterInputs {
  min: number;
  max: number;
  availableNum: NumbersAvailable;
}

@Injectable({ providedIn: 'root' })
export class NumberService {
  private _previousResult!: number;

  constructor(
    private _filterMethodService: FilterMethodService,
  ) {}

  public handleGenerateNumber(options: INumbersFilterInputs): string {
    let generatedNum: string = '';
    let newNum = this._getRandomNum(options);

    while (newNum === this._previousResult) {
      newNum = this._getRandomNum(options);
    }

    if (options.availableNum === NumbersAvailable.even) {
      while (!this._isNumberEven(newNum)) {
        newNum = this._getRandomNum(options);
      }
      generatedNum = String(newNum);
    } else if (options.availableNum === NumbersAvailable.odd) {
      while (this._isNumberEven(newNum) || newNum === 0) {
        newNum = this._getRandomNum(options);
      }
      generatedNum = String(newNum);
    } else if (options.availableNum === NumbersAvailable.prime) {
      while (!this._isNumberPrime(newNum)) {
        newNum = this._getRandomNum(options);
      }
      generatedNum = String(newNum);
    } else generatedNum = String(newNum);

    this._previousResult = newNum;
    return generatedNum;
  }

  private _getRandomNum(options: INumbersFilterInputs) {
    return this._filterMethodService.getRandomNumber(options.min, options.max);
  }

  private _isNumberEven(number: number): boolean {
    let numPositiv = number < 0 ? number * (-1) : number;
    if (numPositiv >= 2 && numPositiv % 2 === 0) return true;
    else return false
  }

  private _isNumberPrime(number: number): boolean {
    let numPositiv = number < 0 ? number * (-1) : number;

    if (numPositiv === 1) return false;
    else if (numPositiv === 2) return true;
    else {
      let isPrime = false;
      nextNum:
      for (let i = 2; i <= numPositiv; i++) {
        for (let j = 2; j < i; j++) {
          if (i % j === 0) {
            isPrime = false;
            continue nextNum;
          } else isPrime = true;
        }
      }
      return isPrime;
    }
  }
}
