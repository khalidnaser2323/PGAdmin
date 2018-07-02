import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-temp10-chart',
  templateUrl: './temp10-chart.component.html',
  styleUrls: ['./temp10-chart.component.css']
})
export class Temp10ChartComponent implements OnInit {
  ctx: any;
  chart = [];
  @Input('stage') stage: { percentage: number, title: string, details: string, color: string };
  @ViewChild('canvas') canvasRef: ElementRef;;
  constructor(

  ) {

  }

  ngOnInit() {
    console.log("Passed stage from parent ");
    console.log(this.stage);
    
    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    this.chart = new Chart(this.ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          label: 'percent',
          data: [this.stage.percentage, this.rest(this.stage.percentage)],
          backgroundColor: [this.stage.color, 'rgb(214, 214, 194)'],
          borderWidth: '15',

        }]
      },
      options: {
        cutoutPercentage: 70,
      }
    });
  }
  rest(x: number) {
    return 100 - x;
  }


}
