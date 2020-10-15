import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#setLocalStorage', () => {
    const data = {
      page: 1,
      brewer: 'brewer',
      numberCol: '0'
    };
    const parseSpy = spyOn(JSON, 'parse')
      .and.callThrough();
    const getItemSpy = spyOn(localStorage, 'getItem')
      .and.callFake(() => '[]');
    const setItemSpy = spyOn(localStorage, 'setItem')
      .and.callFake(() => undefined);

    component.setLocalStorage(data);

    expect(parseSpy).toHaveBeenCalled();
    expect(parseSpy).toHaveBeenCalledWith('[]');
    expect(getItemSpy).toHaveBeenCalled();
    expect(getItemSpy).toHaveBeenCalledWith('savedData');
    expect(setItemSpy).toHaveBeenCalled();
    expect(setItemSpy).toHaveBeenCalledWith('savedData', '[{"page":1,"brewer":"brewer"}]');
  });
});
