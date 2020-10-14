import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImgDialogComponent } from 'src/app/dialogs/img-dialog/img-dialog.component';
import { BeerData } from 'src/app/interfaces/beer-data';
import { SavedDataLocal } from 'src/app/interfaces/saved-data-local';
import { BeerService } from 'src/app/services/beer.service';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-list-beers',
  templateUrl: './list-beers.component.html',
  styleUrls: ['./list-beers.component.scss']
})
export class ListBeersComponent implements OnInit {

  @Input() numberCol: string;
  @Output() setLocal = new EventEmitter<SavedDataLocal>();

  brewers: string[];
  beers: BeerData;
  selectedberwer: string;
  theme: string;
  constructor(private beerService: BeerService,
              private mainService: MainService,
              public dialog: MatDialog) { }


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

    this.mainService.getTheme().subscribe({
      next: (theme) => {
        this.theme = theme;
      }
    });
  }

  public error(e): void {
    e.target.src = 'https://image.shutterstock.com/image-vector/picture-vector-icon-no-image-600w-1350441335.jpg';
  }

  public openImgDialog(beer): void {
    this.dialog.open(ImgDialogComponent, {
      data: {
        img: beer.image_url,
        name: beer.name
       }
    });
  }

  public async onChangeBerwer(brewer, page): Promise<void> {
    this.setLocal.emit({numberCol: this.numberCol, brewer, page });
    this.beerService.clearSubject();
    await this.beerService.setBeersBrewers(brewer, page);

    await this.beerService.getBeersBrewers$().subscribe({
      next: (beers: BeerData) => {
        this.beers = beers;
      }
    });
  }
}
