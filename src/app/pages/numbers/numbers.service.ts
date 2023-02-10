import { Injectable } from "@angular/core";
import { NumbersAvailable } from "src/app/shared/models/conditions-enums.model";


export interface INamingFilterInputs {
  min: number;
  max: number;
  availableNum: NumbersAvailable;
  prime: boolean;
}

export interface IArgsForGenerateFunction {

}

@Injectable({ providedIn: 'root' })
export class NumberService {

}
