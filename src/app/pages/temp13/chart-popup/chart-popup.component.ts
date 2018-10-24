import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart-popup',
  templateUrl: './chart-popup.component.html',
  styleUrls: ['./chart-popup.component.css']
})
export class PieChartComponent implements OnInit {
  chartTemp: Array<Template9>;
  @ViewChild('firstCanvas') canvasRef1: ElementRef;
  @ViewChild('secondCanvas') canvasRef2: ElementRef;
  @ViewChild('thirdCanvas') canvasRe3: ElementRef;
  ctx1: any;
  ctx2: any;
  ctx3: any;
  firstChart = [];
  secondChart = [];
  thirdChart = [];
  constructor(public dialogRef: MatDialogRef<PieChartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.chartTemp = this.data;
  }

  ngOnInit() {
    console.log("Passed data");
    console.log(this.data);
    this.ctx1 = this.canvasRef1.nativeElement.getContext('2d');
    this.firstChart = new Chart(this.ctx1, {
      type: 'pie',
      data: {

        datasets: [{
          data: this.chartTemp[0].percentageData,
          backgroundColor: this.chartTemp[0].color ? this.chartTemp[0].color : ['rgb(0, 143, 179)',
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

        labels: this.chartTemp[0].labels,

      },
      options: {
        title: {
          display: true,
          text: this.chartTemp[0].title,
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
    this.ctx2 = this.canvasRef2.nativeElement.getContext('2d');
    this.secondChart = new Chart(this.ctx2, {
      type: 'pie',
      data: {

        datasets: [{
          data: this.chartTemp[1].percentageData,
          backgroundColor: this.chartTemp[1].color ? this.chartTemp[1].color : ['rgb(0, 143, 179)',
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

        labels: this.chartTemp[1].labels,

      },
      options: {
        title: {
          display: true,
          text: this.chartTemp[1].title,
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
    this.ctx3 = this.canvasRe3.nativeElement.getContext('2d');
    this.thirdChart = new Chart(this.ctx3, {
      type: 'pie',
      data: {

        datasets: [{
          data: this.chartTemp[2].percentageData,
          backgroundColor: this.chartTemp[2].color ? this.chartTemp[2].color : ['rgb(0, 143, 179)',
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

        labels: this.chartTemp[2].labels,

      },
      options: {
        title: {
          display: true,
          text: this.chartTemp[2].title,
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
