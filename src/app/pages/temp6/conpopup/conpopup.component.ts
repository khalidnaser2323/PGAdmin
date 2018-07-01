import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
//import {Temp6popupComponent} from '../temp6popup/temp6popup.component'
@Component({
  selector: 'app-conpopup',
  templateUrl: './conpopup.component.html',
  styleUrls: ['./conpopup.component.css']
})
export class ConpopupComponent implements OnInit {
  chartValues: template6 = {
    label: "",
    xaxisValues: "",
    yaxisValues: "",
    tempDescribtion: "",
    tempName: ""
  };
  constructor(public dialogRef: MatDialogRef<ConpopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.chartValues = this.data.chartValues;
  }


  ngOnInit() {
    console.log('dialog' + this.chartValues)
  }

}
