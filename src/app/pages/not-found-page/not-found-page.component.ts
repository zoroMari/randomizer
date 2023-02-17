import { Component, OnInit } from '@angular/core';
import { Titles } from 'src/app/shared/models/titles-enums.model';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.sass']
})
export class NotFoundPageComponent {
  public title = Titles.notFound;

}
