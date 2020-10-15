import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ImgDialogComponent } from './img-dialog.component';

describe('ImgDialogComponent', () => {
  let component: ImgDialogComponent;
  let fixture: ComponentFixture<ImgDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgDialogComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      imports: [
        MatDialogModule
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA, useValue: {}
        }
     ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit', () => {
    component.data = 'data';

    component.ngOnInit();
    expect(component.beer).toEqual('data');
  });

  it('#error', () => {
    const event = {
      target: {
        src: ''
      }
    };

    component.error(event);
    expect(event.target.src).toEqual('https://image.shutterstock.com/image-vector/picture-vector-icon-no-image-600w-1350441335.jpg');
  });
});
