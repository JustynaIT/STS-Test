import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BeerService } from 'src/app/services/beer.service';

@Component({
  selector: 'app-list-beers',
  templateUrl: './list-beers.component.html',
  styleUrls: ['./list-beers.component.scss']
})
export class ListBeersComponent implements OnInit {

  @Input() numberCol: string;
  @Output() setLocal = new EventEmitter<any>();

  brewers: string[];
  beers: any;
  selectedberwer: string;
  constructor(private beerService: BeerService) { }


  async ngOnInit(): Promise<void> {
    this.init();
  }

  private init(): void {
    setTimeout(() => {
       this.beerService.getBrewers$().subscribe({
        next: (berwers: string[]) => {
          this.brewers = berwers;
          const savedData = JSON.parse(localStorage.getItem('savedData'));

          if (savedData[this.numberCol]) {
            const brewer = savedData[this.numberCol].brewer;
            const page = savedData[this.numberCol]?.page;

            if (brewer && page) {
              this.selectedberwer = brewer;
              this.onChangeBerwer(brewer, page);
            }
          }
        }
      });
    }, 1500);
  }


  public async onChangeBerwer(brewer, page): Promise<void> {
    this.setLocal.emit({numberCol: this.numberCol, brewer, page });
    this.beerService.clearSubject();
    await this.beerService.setBeersBrewers(brewer, page);

    await this.beerService.getBeersBrewers$().subscribe({
      next: (beers: any) => {
        this.beers = beers;
      }
    });
  }
}
