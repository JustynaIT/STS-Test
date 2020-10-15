import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ButtonOptionsComponent } from './button-options.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { OptionsDialogComponent } from 'src/app/dialogs/options-dialog/options-dialog.component';

describe('ButtonOptionsComponent', () => {
  let component: ButtonOptionsComponent;
  let fixture: ComponentFixture<ButtonOptionsComponent>;

  let dialog: MatDialog;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonOptionsComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      imports: [
        MatDialogModule
      ],
      providers: [
        MatDialog
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    dialog = TestBed.inject(MatDialog);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#openDialog', () => {
    const openSpy = spyOn(dialog, 'open').and
    .callFake(() => undefined);

    component.openDialog();
    expect(openSpy).toHaveBeenCalled();
    expect(openSpy).toHaveBeenCalledWith(OptionsDialogComponent, { width: '250px' });
  });
});
