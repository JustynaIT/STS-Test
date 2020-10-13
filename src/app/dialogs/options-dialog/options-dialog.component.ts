import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-options-dialog',
  templateUrl: './options-dialog.component.html',
  styleUrls: ['./options-dialog.component.scss']
})
export class OptionsDialogComponent implements OnInit {

  themes = ['light', 'dark'];
  numberLoadeds = ['15', '20', '30'];
  sortByFields = ['name', 'price', 'type'];

  theme: string;
  numberLoaded: string;
  sortByField: string;

  constructor(
    public dialogRef: MatDialogRef<OptionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    const options = JSON.parse(localStorage.getItem('options')) || null;

    if (options === null) {
      this.theme = 'dark';
      this.numberLoaded = '15';
      this.sortByField = 'name';
    } else {
      this.theme = options.theme || null;
      this.numberLoaded = options.numberLoaded || null;
      this.sortByField = options.sortByField || null;
    }
  }


  public setOptions(event, option): void {
    const options = JSON.parse(localStorage.getItem('options')) || {};

    options[option] = event;
    localStorage.setItem('options', JSON.stringify(options));
  }
}
