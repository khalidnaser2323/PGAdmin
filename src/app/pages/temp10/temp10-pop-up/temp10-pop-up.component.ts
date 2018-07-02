import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-temp10-pop-up',
  templateUrl: './temp10-pop-up.component.html',
  styleUrls: ['./temp10-pop-up.component.css']
})
export class Temp10PopUpComponent implements OnInit {
  temp: Temp10;


  constructor(
    public dialogRef: MatDialogRef<Temp10PopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log("passed data");
    console.log(data);
    this.temp = this.data.ChartValues;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
