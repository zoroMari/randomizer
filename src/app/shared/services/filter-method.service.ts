import { Injectable } from "@angular/core";
import { TextStyle, LettersAvailable } from "../models/conditions-enums.model";

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

      case TextStyle.lower:
        return word.toLowerCase();

      case TextStyle.cap:
        return word[0].toUpperCase() + word.slice(1).toLowerCase();
    }
  }

  public filterLetters(possibleLettersCondition: LettersAvailable, allLetters: string, selectedLetters: string): string {
    switch (possibleLettersCondition) {
      case LettersAvailable.all:
        return allLetters;

      case LettersAvailable.consonants:
        return 'bcdfghjklmnpqrstvwxz';

      case LettersAvailable.vowels:
        return 'aeiouy';

      case LettersAvailable.select:
        return selectedLetters;
    }
  }

}
