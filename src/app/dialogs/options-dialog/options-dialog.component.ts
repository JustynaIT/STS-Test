import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MainService } from 'src/app/services/main.service';

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
    private mainService: MainService) {}

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

    if (option === 'theme') {
      this.mainService.setTheme(event);
    }
  }
}
