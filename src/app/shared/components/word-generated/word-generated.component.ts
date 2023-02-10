import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-word-generated',
  templateUrl: './word-generated.component.html',
  styleUrls: ['./word-generated.component.sass']
})
export class WordGeneratedComponent implements OnInit {
  @Input() elemGenerated: string = '---';
  @Input() saved: boolean = false;
  @Output() onSave = new EventEmitter<null>();

  constructor() { }

  ngOnInit(): void {
  }

  public handleSaveWord() {
    this.onSave.emit();
  }

}
