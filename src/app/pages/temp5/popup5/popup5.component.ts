import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-popup5',
  templateUrl: './popup5.component.html',
  styleUrls: ['./popup5.component.css']
})
export class Popup5Component implements OnInit {
  ChartValues:template5=null;
  constructor(public dialogRef: MatDialogRef<Popup5Component>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.ChartValues = this.data.ChartValues;
     }

  ngOnInit() {
    console.log ('popup data');
    console.log (this.data.ChartValues);
  }

}
