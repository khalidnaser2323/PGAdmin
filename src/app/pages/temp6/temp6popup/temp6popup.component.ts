import { Component, OnInit ,ViewChild,ElementRef, Input} from '@angular/core';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-temp6popup',
  templateUrl: './temp6popup.component.html',
  styleUrls: ['./temp6popup.component.css']
})
export class Temp6popupComponent implements OnInit {

  ctx:any;
  chart=[];
  @Input()chartValues:template6;
  @ViewChild('myCanvas') canvasRef: ElementRef;
  constructor() { 
    console.log('chart'+ this.chartValues)
  }

  ngOnInit() {
    const yaxix = this.chartValues.yaxisValues.split(",");
    const xaxis= this.chartValues.xaxisValues.split(",");
    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    this.ctx.lineJoin = 'miter';
    this.chart = new Chart(this.ctx, {
      type: 'line',
      
    data: {
      labels:yaxix ,
        datasets: [{
            label:this.chartValues.label,
            lineTension:'0',
            data:yaxix,
            backgroundColor: 'rgb(51, 204, 255)', 
            borderColor:'rgb(204, 204, 204)', 
            borderWidth: 5
         }],
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
  
  }
  
 
}
