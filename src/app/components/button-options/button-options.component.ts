import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OptionsDialogComponent } from 'src/app/dialogs/options-dialog/options-dialog.component';

@Component({
  selector: 'app-button-options',
  templateUrl: './button-options.component.html',
  styleUrls: ['./button-options.component.scss']
})
export class ButtonOptionsComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(OptionsDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
