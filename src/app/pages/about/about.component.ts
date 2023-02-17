import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Titles } from 'src/app/shared/models/titles-enums.model';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.sass']
})
export class AboutComponent implements OnInit {
  public title: Titles = Titles.about;

  constructor() { }

  ngOnInit(): void {
  }

}
