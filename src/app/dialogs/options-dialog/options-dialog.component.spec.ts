import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OptionsDialogComponent } from './options-dialog.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

describe('OptionsDialogComponent', () => {
  let component: OptionsDialogComponent;
  let fixture: ComponentFixture<OptionsDialogComponent>;

  let mainService: MainService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionsDialogComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        MainService,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    mainService = TestBed.inject(MainService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    let getItemSpy;
    let parseSpy;
    let options;

    beforeEach(() => {
      getItemSpy = spyOn(localStorage, 'getItem')
        .and.callFake(() => '[]');
      parseSpy = spyOn(JSON, 'parse')
        .and.callFake(() => options);
    });

    it('when options are null', () => {
      options = null;

      component.ngOnInit();
      expect(parseSpy).toHaveBeenCalled();
      expect(parseSpy).toHaveBeenCalledWith('[]');
      expect(getItemSpy).toHaveBeenCalled();
      expect(getItemSpy).toHaveBeenCalledWith('options');
      expect(component.theme).toEqual('dark');
      expect(component.numberLoaded).toEqual('15');
      expect(component.sortByField).toEqual('name');
    });

    it('when options are not null', () => {
      options = {
        theme: 'theme',
        numberLoaded: 'numberLoaded',
        sortByField: 'sortByField'
      };

      component.ngOnInit();
      expect(parseSpy).toHaveBeenCalled();
      expect(parseSpy).toHaveBeenCalledWith('[]');
      expect(getItemSpy).toHaveBeenCalled();
      expect(getItemSpy).toHaveBeenCalledWith('options');
      expect(component.theme).toEqual('theme');
      expect(component.numberLoaded).toEqual('numberLoaded');
      expect(component.sortByField).toEqual('sortByField');
    });
  });

  describe('#setOptions', () => {
    let getItemSpy;
    let setItemSpy;
    let parseSpy;
    let setThemeSpy;

    beforeEach(() => {
      getItemSpy = spyOn(localStorage, 'getItem')
        .and.callFake(() => '{}');
      setItemSpy = spyOn(localStorage, 'setItem')
        .and.callFake(() => undefined);
      parseSpy = spyOn(JSON, 'parse')
        .and.callThrough();
      setThemeSpy = spyOn(mainService, 'setTheme')
        .and.callFake(() => undefined);
    });

    it('when option is theme', () => {

      component.setOptions('dark', 'theme');
      expect(parseSpy).toHaveBeenCalled();
      expect(parseSpy).toHaveBeenCalledWith('{}');
      expect(getItemSpy).toHaveBeenCalled();
      expect(getItemSpy).toHaveBeenCalledWith('options');
      expect(setItemSpy).toHaveBeenCalled();
      expect(setThemeSpy).toHaveBeenCalled();
      expect(setThemeSpy).toHaveBeenCalledWith('dark');
    });
  });
});
