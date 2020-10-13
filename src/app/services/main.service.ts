import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Beer } from '../interfaces/beer';

@Injectable({
    providedIn: 'root'
  })
  export class MainService {

    constructor(private http: HttpClient) { }

    public getAll(): Observable<any> {
      return this.http.get(`api/beers/`);
    }

}
