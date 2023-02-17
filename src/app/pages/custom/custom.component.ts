import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Titles } from 'src/app/shared/models/titles-enums.model';
import { TextStyle } from 'src/app/shared/models/conditions-enums.model';
import { FilterMethodService } from "src/app/shared/services/filter-method.service";
import { SavedService } from '../saved-list/saved-list.service';

@Component({
  selector: 'app-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.sass']
})
export class CustomComponent implements OnInit {
  public title: Titles = Titles.custon;
  public form!: FormGroup;
  public randomItem: string = '---';
  public isSaved = false;
  public style = TextStyle;

  constructor(
    private _filterMethodService: FilterMethodService,
    private _savedService: SavedService,
  ) { }

  ngOnInit(): void {
    this._formInitialization();
  }

  public getRandomItem() {
    this.isSaved = false;

    const style = this.form.controls['style'].value;
    const items: string = this.form.controls['items'].value.replace(/,\s*$/, '');
    const itemsArray: string[] = items.split(/,\s*/);
    const randomItem: string = this._filterMethodService.getRandomItemFromArray(itemsArray);

    this.randomItem = this._filterMethodService.addStyleToWord(randomItem, style);
  }

  public handleSaveWord() {
    this.isSaved = true;
    this._savedService.saveWord(this.randomItem, this.title);
  }

  private _formInitialization() {
    this.form = new FormGroup({
      items: new FormControl('', Validators.required),
      style: new FormControl('capitalize', Validators.required),
    })
  }
}
