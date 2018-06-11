import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {ConpopupComponent} from './conpopup/conpopup.component';
@Component({
  selector: 'app-temp6',
  templateUrl: './temp6.component.html',
  styleUrls: ['./temp6.component.css']
})
export class Temp6Component implements OnInit {

  chartValues:template6={
    label:"",
     xaxisValues:"",
     yaxisValues:"",
  }
  titleValues:title ={
    tempName:"",
    tempDescribtion:"",
  }

  constructor( public dialog: MatDialog) {
   
   }

  ngOnInit() {
 
  }

  onsaveTitle()
  {
    console.log('name&descriptio');
    console.log(this.titleValues);
  } 
  onSaveChartData()
  {
    console.log("chartData");
    console.log(this.chartValues);
  }
   
  openDialog(): void {
    let dialogRef = this.dialog.open(ConpopupComponent, {
      height: '400px',
      width: '600px',
      data: {chartValues: this.chartValues }
    });
  }

}
