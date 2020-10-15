import { Component } from '@angular/core';
import { SavedDataLocal } from 'src/app/interfaces/saved-data-local';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  constructor() { }

  public setLocalStorage(savedData: SavedDataLocal): void {
    const dataL = JSON.parse(localStorage.getItem('savedData')) || [];

    dataL[savedData.numberCol] = { page: savedData.page, brewer: savedData.brewer };
    localStorage.setItem('savedData', JSON.stringify(dataL));
  }
}

