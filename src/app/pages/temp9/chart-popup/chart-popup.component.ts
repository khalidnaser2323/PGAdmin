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
          backgroundColor: this.chartTemp.color ? this.chartTemp.color : ['rgb(0, 143, 179)',
          'rgb(0, 102, 0)',
          'rgb(51, 51, 0)',
          'rgb(77, 19, 0)',
          'rgb(31, 31, 122)',
          'rgb(51, 0, 102)',
          'rgb(102, 102, 0)',
          'rgb(102, 0, 51)',
          'rgb(51, 51, 153)',
          'rgb(102, 153, 153)'],
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
