import { Injectable } from '@angular/core';
import { MainService } from './main.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Beer } from '../interfaces/beer';
import { BeerData } from '../interfaces/beer-data';

@Injectable({
    providedIn: 'root'
  })
  export class BeerService {

    beersBrewersSubject: BehaviorSubject<BeerData> = new BehaviorSubject<BeerData>(null);

    brewersSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
    allBeersSubject: BehaviorSubject<Beer[]> = new BehaviorSubject<Beer[]>([]);
    constructor(private mainService: MainService) {}

    public setData(): void {
      this.mainService.getAll().subscribe({
        next: (beers: Beer[]) => {
          this.allBeersSubject.next(beers);
          this.setBrewers(beers);
        }
      });
    }

    public getBrewers$(): Observable<string[]> {
      return this.brewersSubject.asObservable();
    }

    public getAllBeers$(): Observable<Beer[]> {
        return this.allBeersSubject.asObservable();
    }

    public getBeersBrewers$(): Observable<BeerData> {
      return this.beersBrewersSubject.asObservable();
    }

    public async setBeersBrewers(brewer: string, page: number): Promise<void> {
      const options = JSON.parse(localStorage.getItem('options')) || {};
      const perPage = options.numberLoaded || 15;
      const sortBy = options.sortByField || 'name';

      await this.getAllBeers$().subscribe({
        next: (beers: Beer[]) => {
          let beersBrewers = beers.filter(beer => beer.brewer === brewer);
          beersBrewers = this.sort(beersBrewers, sortBy);

          const totalCount = beersBrewers.length;
          const data: BeerData = {
            beers: beersBrewers.splice(0, perPage * page),
            page,
            per_page: perPage,
            count: null,
            total_count: totalCount,
          };

          data.count = data.beers.length;
          this.beersBrewersSubject.next(data);
        }
      });
  }

  private sort(array: Beer[], type: string): Beer[] {
    return type === 'price' ?
      array.sort((a, b) =>  Number(a[type]) - Number(b[type])) :
      array.sort((a, b) => a[type].localeCompare(b[type]));
  }

  public clearSubject(): void {
    if (this.beersBrewersSubject) {
      this.beersBrewersSubject.observers = [];
    }
  }

  private setBrewers(beers: Beer[]): void {
    const brewers = [];

    beers.forEach((beer: Beer) => {
      brewers.push(beer.brewer);
    });

    this.brewersSubject.next([... new Set(brewers)]);
  }

}
