import { Injectable } from "@angular/core";
import { TextStyle, PossibleLetters } from "../models/conditions-enums.model";

@Injectable({providedIn: 'root'})
export class FilterMethodService {
  public getRandomItemFromArray(array: string[]): string {
    const index = this.getRandomNumber(array.length);
    return array[index];
  }

  public getRandomNumber(max: number): number {
    return Math.floor(Math.random() * max);
  }

  public addStyleToWord(word: string, condition: TextStyle): string {
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

  public filterLetters(possibleLettersCondition: PossibleLetters, allLetters: string, selectedLetters: string): string {
    switch (possibleLettersCondition) {
      case PossibleLetters.all:
        return allLetters;
        break;

      case PossibleLetters.consonants:
        return 'bcdfghjklmnpqrstvwxz';
        break;

      case PossibleLetters.vowels:
        return 'aeiouy';
        break;

      case PossibleLetters.select:
        return selectedLetters;
        break;
    }
  }

}
