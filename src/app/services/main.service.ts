import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Beer } from '../interfaces/beer';

@Injectable({
    providedIn: 'root'
  })
  export class MainService {
    themeSubject: BehaviorSubject<string> = new BehaviorSubject<string>('dark');

    constructor(private http: HttpClient) {
      const options = JSON.parse(localStorage.getItem('options')) || {};
      this.themeSubject.next(options.theme);
    }

    public getAll(): Observable<Beer[]> {
      return this.http.get<Beer[]>(`api/beers/`);
    }

    public getTheme(): Observable<string> {
      return this.themeSubject.asObservable();
    }

    public setTheme(theme): void {
      this.themeSubject.next(theme);
    }
}
