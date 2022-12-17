import { Injectable } from "@angular/core";
import { TextStyle } from "../models/conditions-enums.model";

@Injectable({providedIn: 'root'})
export class FilterMethodService {
  public getRandomItemFromArray(array: string[]): string {
    const index = this.getRandomNumber(array.length);
    return array[index];
  }

  public getRandomNumber(max: number): number {
    return Math.floor(Math.random() * max);
  }

  public styleOfWord(word: string, condition: TextStyle): string {
    switch (condition) {
      case TextStyle.upper:
        return word.toUpperCase();
        break;

      case TextStyle.lower:
        return word.toLowerCase();
        break;

      case TextStyle.cap:
        return word[0].toUpperCase() + word.slice(1).toLowerCase();
        break;
    }
  }

}
