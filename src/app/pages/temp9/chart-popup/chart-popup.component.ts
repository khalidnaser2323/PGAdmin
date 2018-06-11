import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart-popup',
  templateUrl: './chart-popup.component.html',
  styleUrls: ['./chart-popup.component.css']
})
export class ChartPopupComponent implements OnInit {
  chartTemp: Template9;
  @ViewChild('canvas') canvasRef: ElementRef;
  ctx: any;
  chart = [];
  constructor(public dialogRef: MatDialogRef<ChartPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.chartTemp = this.data;
  }

  ngOnInit() {
    console.log("Passed data");
    console.log(this.data);
    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    this.chart = new Chart(this.ctx, {
      type: 'pie',
      data: {

        datasets: [{
          data: this.chartTemp.percentageData,
          backgroundColor: this.chartTemp.color ? this.chartTemp.color : ['red', 'blue', 'yellow', 'orange', 'grey', 'pink', 'chocolate', 'lime', 'khaki', 'purple'],
          borderWidth: '7',
        }],

        labels: this.chartTemp.labels,

      },
      options: {
        title: {
          display: true,
          text: this.chartTemp.title,
          fontSize: 20,
        },

        responsive: true,
        responsiveAnimationDuration: 5,

        legend: {
          display: 'true',
          position: 'bottom',

          labels: {
            boxWidth: 70,
            fontSize: 20,
            fontColor: "rgb(0, 0, 0)",
            tooltips: {
              callbacks: {
                labelColor: ' rgb(71, 90, 255)',

              },

            },
          },

        }
      },


    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
