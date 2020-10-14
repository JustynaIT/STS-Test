import { Component, OnInit } from '@angular/core';
import { BeerService } from './services/beer.service';
import { MainService } from './services/main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'STS-test';
  theme = '';

  constructor(private mainService: MainService, private beerService: BeerService) {}

  public ngOnInit(): void {
      this.beerService.setData();
      this.beerService.getBrewers$().subscribe({
        next: (brewers) => {
         // console.log(brewers);
        }
      });

      this.mainService.getTheme().subscribe({
        next: (theme) => {
          this.theme = theme;
        }
      });
  }
}
