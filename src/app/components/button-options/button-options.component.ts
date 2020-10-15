import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OptionsDialogComponent } from 'src/app/dialogs/options-dialog/options-dialog.component';

@Component({
  selector: 'app-button-options',
  templateUrl: './button-options.component.html',
  styleUrls: ['./button-options.component.scss']
})
export class ButtonOptionsComponent {

  constructor(public dialog: MatDialog) { }

  public openDialog(): void {
    this.dialog.open(OptionsDialogComponent, {
      width: '250px',
    });
  }

}
