import { Component, OnInit } from '@angular/core';
import { BeerService } from './services/beer.service';
import { MainService } from './services/main.service';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
  title = 'STS-test';

  constructor(private mainService: MainService, private beerService: BeerService) {}

  public ngOnInit() {    
      this.beerService.setData();
      this.beerService.getBrewers$().subscribe({
        next: (brewers) => {
         // console.log(brewers);
        }
      });
  }
}
