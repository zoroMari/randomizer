import { Injectable } from "@angular/core";
import { TextStyle, PossibleLetters } from "../models/conditions-enums.model";

@Injectable({providedIn: 'root'})
export class FilterMethodService {
  public getRandomItemFromArray(array: string[]): string {
    const index = this.getRandomNumber(0,array.length - 1);
    return array[index];
  }

  public getRandomNumber(min: number, max: number) {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
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
