import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor() { }


  ngOnInit(): void {

  }

  public setLocalStorage(savedData: any): void{
    const dataL = JSON.parse(localStorage.getItem('savedData')) || [];

    dataL[savedData.numberCol] = { page: savedData.page, brewer: savedData.brewer };
    localStorage.setItem('savedData', JSON.stringify(dataL));
  }
}

