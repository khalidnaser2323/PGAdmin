import { Component, OnInit,Input ,ViewChild,ElementRef} from '@angular/core';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-temp12popup',
  templateUrl: './temp12popup.component.html',
  styleUrls: ['./temp12popup.component.css']
})
export class Temp12popupComponent implements OnInit {
  @Input() ChartValues:template6 ;
  @ViewChild('myCanvas') canvasRef: ElementRef;
  chart=[];
  ctx:any;
  constructor() { }

  ngOnInit() {
    const yaxix = this.ChartValues.yaxisValues.split(",");
    const xaxis= this.ChartValues.xaxisValues.split(",");
    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    this.chart = new Chart(this.ctx, {
      type: 'bar',
    data: {
      labels:yaxix,
        datasets: [{
        label:this.ChartValues.label , 
        backgroundColor:'rgb(0, 204, 153,0.2)',
         borderColor:'rgb(0, 204, 153,0.2)',
         borderWidth:1, 
         data:xaxis,
        },
        
      ]
    },
 
    options: {
      title: {
        display: true,
        text: this.ChartValues.label,
        fontSize:20,
    },
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
