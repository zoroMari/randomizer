import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-word-generated',
  templateUrl: './word-generated.component.html',
  styleUrls: ['./word-generated.component.sass']
})
export class WordGeneratedComponent implements OnInit {
  @Input() wordGenerated: string = '---';
  @Input() saveButton: boolean = false;
  @Input() saved: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
