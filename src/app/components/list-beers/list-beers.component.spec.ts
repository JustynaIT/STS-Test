import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ListBeersComponent } from './list-beers.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ImgDialogComponent } from 'src/app/dialogs/img-dialog/img-dialog.component';
import { BeerService } from 'src/app/services/beer.service';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ListBeersComponent', () => {
  let component: ListBeersComponent;
  let fixture: ComponentFixture<ListBeersComponent>;

  let dialog: MatDialog;
  let beerSevice: BeerService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBeersComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      imports: [
        HttpClientTestingModule,
        MatDialogModule
      ],
      providers: [
        MatDialog,
        BeerService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBeersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    dialog = TestBed.inject(MatDialog);
    beerSevice = TestBed.inject(BeerService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit', () => {
    const initSpy =  spyOn<any>(component, 'init')
    .and.callFake(() => undefined);

    component.ngOnInit();
    expect(initSpy).toHaveBeenCalled();
  });

  it('#error', () => {
    const event = {
      target: {
        src: '',
      }
    };

    component.error(event);
    expect(event.target.src).toEqual('https://image.shutterstock.com/image-vector/picture-vector-icon-no-image-600w-1350441335.jpg');
  });

  it('#openImgDialog', () => {
    const beer = {
      image_url: 'image_url',
      name: 'name',
    };
    const openSpy = spyOn(dialog, 'open')
    .and.callFake(() => undefined);

    component.openImgDialog(beer);
    expect(openSpy).toHaveBeenCalled();
    expect(openSpy).toHaveBeenCalledWith(ImgDialogComponent, {
      data: {
        img: 'image_url',
        name: 'name'
      }
    });
  });

  it('#onChangeBerwer', async () => {
    const emitter: any = {
      emit: () => {}
    };

    component.setLocal =  emitter;
    component.numberCol = '1';
    const clearSubjectSpy = spyOn(beerSevice, 'clearSubject')
      .and.callFake(() => undefined);
    const setBeersBrewersSpy = spyOn(beerSevice, 'setBeersBrewers')
      .and.callFake(() => undefined);
    const getBeersBrewersSpy = spyOn(beerSevice, 'getBeersBrewers$')
      .and.callFake(() => of('beer'as any));
    const emitSpy = spyOn(component.setLocal, 'emit')
    .and.callFake(() => undefined);

    await component.onChangeBerwer('brewer', 1);
    expect(emitSpy).toHaveBeenCalled();
    expect(emitSpy).toHaveBeenCalledWith({
      numberCol: '1',
      brewer: 'brewer',
      page: 1
    });
    expect(clearSubjectSpy).toHaveBeenCalled();
    expect(setBeersBrewersSpy).toHaveBeenCalled();
    expect(setBeersBrewersSpy).toHaveBeenCalledWith('brewer', 1);
    expect(getBeersBrewersSpy).toHaveBeenCalled();
    expect(component.beers).toEqual('beer' as any);
  });
});
