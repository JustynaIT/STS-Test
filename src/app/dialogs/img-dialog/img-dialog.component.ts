import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-img-dialog',
  templateUrl: './img-dialog.component.html',
  styleUrls: ['./img-dialog.component.scss']
})
export class ImgDialogComponent implements OnInit {

  beer: any;

  constructor(
    public dialogRef: MatDialogRef<ImgDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.beer = this.data;
  }

  public error(e): void {
    e.target.src = 'https://image.shutterstock.com/image-vector/picture-vector-icon-no-image-600w-1350441335.jpg';
  }

}
