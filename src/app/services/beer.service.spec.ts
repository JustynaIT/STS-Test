import { TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BeerService } from './beer.service';
import { MainService } from './main.service';
import { of } from 'rxjs';

describe('BeerService', () => {
    let service: BeerService;
    let mainService: MainService;
    beforeEach(() => TestBed.configureTestingModule({
        schemas: [
            CUSTOM_ELEMENTS_SCHEMA
        ],
        imports: [
            RouterTestingModule,
            HttpClientTestingModule,
        ],
        providers: [
            MainService
        ]
    }));

    beforeEach(() => {
        service = TestBed.inject(BeerService);
        mainService = TestBed.inject(MainService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('#setData', async () => {
        const getAllSpy = spyOn(mainService, 'getAll')
            .and.callFake(() => of('beer' as any));
        const nextSpy = spyOn(service.allBeersSubject, 'next')
            .and.callFake(() => undefined);
        const setBrewersSpy = spyOn<any>(service, 'setBrewers')
            .and.callFake(() => undefined);

        await service.setData();
        expect(getAllSpy).toHaveBeenCalled();
        expect(nextSpy).toHaveBeenCalled();
        expect(nextSpy).toHaveBeenCalledWith('beer' as any);
        expect(setBrewersSpy).toHaveBeenCalled();
        expect(setBrewersSpy).toHaveBeenCalledWith('beer');
    });

    it('#getBrewers$', () => {
        const asObservableSpy = spyOn(service.brewersSubject, 'asObservable')
            .and.callFake(() => undefined);

        service.getBrewers$();
        expect(asObservableSpy).toHaveBeenCalled();
    });

    it('#getAllBeers$', () => {
        const asObservableSpy = spyOn(service.allBeersSubject, 'asObservable')
            .and.callFake(() => undefined);

        service.getAllBeers$();
        expect(asObservableSpy).toHaveBeenCalled();
    });

    it('#getBeersBrewers$', () => {
        const asObservableSpy = spyOn(service.beersBrewersSubject, 'asObservable')
            .and.callFake(() => undefined);

        service.getBeersBrewers$();
        expect(asObservableSpy).toHaveBeenCalled();
    });

    it('#setBeersBrewers', async () => {
        const options = {
            numberLoaded: 15,
            sortByField: 'name'
        };
        const parseSpy = spyOn(JSON, 'parse')
            .and.callFake(() => options);
        const getItemSpy = spyOn(localStorage, 'getItem')
            .and.callFake(() => '{}');
        const getAllBeersSpy = spyOn(service, 'getAllBeers$')
            .and.callFake(() => of([]));
        const sortSpy = spyOn<any>(service, 'sort')
            .and.callFake(() => []);
        const nextSpy = spyOn(service.beersBrewersSubject, 'next')
            .and.callFake(() => undefined);

        await service.setBeersBrewers('brewer', 1);
        expect(getItemSpy).toHaveBeenCalled();
        expect(getItemSpy).toHaveBeenCalledWith('options');
        expect(parseSpy).toHaveBeenCalled();
        expect(parseSpy).toHaveBeenCalledWith('{}');
        expect(getAllBeersSpy).toHaveBeenCalled();
        expect(sortSpy).toHaveBeenCalled();
        expect(sortSpy).toHaveBeenCalledWith([], 'name');
        expect(nextSpy).toHaveBeenCalled();
        expect(nextSpy).toHaveBeenCalledWith({ beers: [  ], page: 1, per_page: 15, count: 0, total_count: 0 });
    });


    it('#clearSubject', () => {
        service.beersBrewersSubject = {
            observers: null,
        } as any;

        service.clearSubject();
        expect(service.beersBrewersSubject.observers).toEqual([]);
    });

    it('#setBrewers', () => {
        const beers = [{brewer: 'berwer', berwer: 'berwer'}];
        const nextSpy = spyOn(service.brewersSubject, 'next')
            .and.callFake(() => undefined);

        (service as any).setBrewers(beers);
        expect(nextSpy).toHaveBeenCalled();
        expect(nextSpy).toHaveBeenCalledWith([ 'berwer' ]);
    });
});
