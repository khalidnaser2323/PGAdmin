import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-temp12conn',
  templateUrl: './temp12conn.component.html',
  styleUrls: ['./temp12conn.component.css']
})
export class Temp12connComponent implements OnInit {
  ChartValues: template6 = {
    label: '',
    xaxisValues: '',
    yaxisValues: '',
    tempDescribtion: "",
    tempName: "",
    tableData: [
    ]
  }
  constructor(public dialogRef: MatDialogRef<Temp12connComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.ChartValues = this.data.ChartValues;
  }
  ngOnInit() {
  }

}
