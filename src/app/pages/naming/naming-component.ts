import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";

@Component({
  selector: 'app-naming',
  templateUrl: './naming-component.html',
  styleUrls: ['./naming-component.sass'],
})
export class NamingComponent implements OnInit {
  public letterList: string[] = ['a', 'b', 'c'];
  public styleList: string[] = ['capital', 'fisrt capital', 'normal'];
  public form!: FormGroup;

  ngOnInit() {
    this._formInitialization();
  }

  private _formInitialization() {
    this.form = new FormGroup({
      length: new FormControl('', Validators.required),
      style: new FormControl(this.styleList[0], Validators.required),
      letters: new FormControl('', Validators.required),
      starts: new FormControl(''),
      includes: new FormControl(''),
      ends: new FormControl(''),
    })
  }
}
