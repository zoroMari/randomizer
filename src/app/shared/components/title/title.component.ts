import { Component, Input, OnInit } from '@angular/core';
import { Titles } from '../../models/titles-enums.model';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.sass']
})
export class TitleComponent implements OnInit {
  @Input() title: Titles | string = 'Default';
  @Input() isSavedList: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
