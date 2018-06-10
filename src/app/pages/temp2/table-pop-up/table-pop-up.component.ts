import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { Chart } from 'chart.js';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-table-pop-up',
  templateUrl: './table-pop-up.component.html',
  styleUrls: ['./table-pop-up.component.css']
})
export class TablePopUpComponent implements OnInit {
  ctx: any;
  chart = [];
  licence: LicenseModel;
  @ViewChild('myCanvas') canvasRef: ElementRef;
  constructor(public dialogRef: MatDialogRef<TablePopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.licence = this.data.licence;

  }

  ngOnInit() {
    console.log("Passed date");
    console.log(this.data);
    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    let chartLabels: Array<string> = [];
    let chartData: Array<string> = [];
    for (let row of this.licence.tableData) {
      chartLabels.push(row.OrderDate);
      chartData.push(row.TotalCost);
    }

    this.chart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: chartLabels,
        datasets: [{
          lineTension: '0',

          label: 'TotalCost',
          data: chartData
          ,
          backgroundColor: [
            'rgba(00, 99, 132, 0.2)',
          ],
          fill: false,
          borderColor: [
            'rgba(0, 51, 0,1)',
          ],
          borderWidth: 0
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
