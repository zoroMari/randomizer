import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { PossibleLetters, TextStyle } from "src/app/shared/models/conditions-enums.model";
import { FilterMethodService } from "src/app/shared/services/filter-method.service";


export interface INamingFilterInputs {
  length: number;
  style: TextStyle;
  identicalLetters: boolean;
  lettersCondition: PossibleLetters;
  lettersSelected: string[];
  start: string;
  includes: string;
  ends: string;
}

export interface IArgsForGenerateFunction {
  form: FormGroup,
  options: INamingFilterInputs,
  startPart: string,
  includePart: string,
  endPart: string
}

@Injectable({providedIn: 'root'})
export class NamingSevice {
  constructor(
    private _filterMethodService: FilterMethodService,
  ) {}

  public generateWord({form, options, startPart, includePart, endPart} :IArgsForGenerateFunction): string {
    const start = [...startPart];
    const include = [...includePart];
    const end = [...endPart];
    let mediumPart: string[] = [];
    const word: string[] = [];

    word.push(...start, ...include, ...end);

    const maxGeneratedLength = options.length - word.length;
    const generatedPart = [];
    const lastIndexOfPartBeforeInclude = Math.floor(maxGeneratedLength / 2) - 1;
    const firstIndexofPartAfterInclude = Math.floor(maxGeneratedLength / 2);

    while (generatedPart.length < maxGeneratedLength) {
      let letter: string = this._filterMethodService.getRandomItemFromArray(options.lettersSelected);

      const canBeIdenticalLetters = options.identicalLetters === false || form.controls['identicalLetters'].disabled;
      const firstGeneratedLetterEqualsStartLastLetterOrIncludeFirstLetter =
        generatedPart.length === 0
        && (
          (
            start.length > 0
            && start[start.length - 1].toLowerCase() === letter.toLowerCase()
          )
          || (
            include.length > 0 &&
            include[0].toLowerCase() === letter.toLowerCase()
          )
        );
      const newGeneratedLetterEqualsPreviousGeneratedLetter =
        generatedPart.length > 0
        && generatedPart[generatedPart.length - 1].toLowerCase() === letter.toLowerCase();
      const lastLetterOfFirstGeneratedPartEqualsFirstIncludeLetter =
        include.length > 0
        && generatedPart.length === lastIndexOfPartBeforeInclude
        && letter.toLowerCase() === include[0].toLowerCase();
      const firstLetterOfSecondGeneratedPartEqualsLastIncludeLetter =
        include.length > 0
        && generatedPart.length === firstIndexofPartAfterInclude
        && letter.toLowerCase() === include[include.length - 1].toLowerCase();
      const lastLetterOfSecondGeneratedPartEqualsFirstEndLetter =
        generatedPart.length === maxGeneratedLength - 1
        && end.length > 0
        && end[0].toLowerCase() === letter.toLowerCase();

      if (canBeIdenticalLetters) generatedPart.push(letter);
      else {
        if (
          firstGeneratedLetterEqualsStartLastLetterOrIncludeFirstLetter
          || newGeneratedLetterEqualsPreviousGeneratedLetter
          || lastLetterOfFirstGeneratedPartEqualsFirstIncludeLetter
          || firstLetterOfSecondGeneratedPartEqualsLastIncludeLetter
          || lastLetterOfSecondGeneratedPartEqualsFirstEndLetter
        ) continue;

        else {
          generatedPart.push(letter);
        }
      }
    }

    const firstPart = generatedPart.slice(0, lastIndexOfPartBeforeInclude + 1);
    const secondPart = generatedPart.slice(firstIndexofPartAfterInclude);

    mediumPart = [...firstPart, ...include, ...secondPart];

    const newWord = [...start, ...mediumPart, ...end];
    return this._filterMethodService.addStyleToWord(newWord.join(''), options.style);
  }
}
