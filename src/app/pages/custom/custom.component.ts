import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Titles } from 'src/app/shared/models/titles-enums.model';

@Component({
  selector: 'app-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.sass']
})
export class CustomComponent implements OnInit {
  public title: Titles = Titles.custon;
  public form!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this._formInitialization();
  }

  private _formInitialization() {
    this.form = new FormGroup({
      items: new FormControl('', Validators.required),
    })
  }


}
