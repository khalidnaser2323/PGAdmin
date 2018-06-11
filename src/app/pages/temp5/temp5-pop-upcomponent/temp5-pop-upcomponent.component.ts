import { Component, OnInit,ViewChild,ElementRef, Input,Inject } from '@angular/core';
import { Chart } from 'chart.js';
import {Popup5Component} from '../popup5/popup5.component'
import {dataService} from '../../../Services/data.Service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-temp5-pop-upcomponent',
  templateUrl: './temp5-pop-upcomponent.component.html',
  styleUrls: ['./temp5-pop-upcomponent.component.css'],
  providers:[]
})
export class Temp5PopUpcomponentComponent implements OnInit {
  ctx:any;
  chart=[];
  @Input() ChartValues:template5;
  length:number;
  x:number;
  values:template5;
  @ViewChild('myCanvas') canvasRef: ElementRef;
  //@ViewChild('chartValues') chartValues:template5;
 constructor()
 {
   
 }
  ngOnInit() {
    console.log('temp data');
    console.log(this.ChartValues);
    
    this.x=0;
    const xaxisValues= this.ChartValues.xaxisValues.split(",");
    const y1 = this.ChartValues.y1Values.split(",");
    const y2 = this.ChartValues.y2Values.split(",");
    this.length=this.ChartValues.y1Values.length;
    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    this.chart = new Chart(this.ctx, {
      type: 'bar',
    data: {
      labels:xaxisValues,
        datasets: [{
        label:this.ChartValues.label1 , 
        backgroundColor:this.colorloop('rgb(0, 230, 184,0.2)'),
         borderColor:this.colorloop('rgb(0, 102, 102)'),
         borderWidth:1, 
         data:y1,
        },
        {
          label:this.ChartValues.label2 , 
          backgroundColor:this.colorloop('rgb(255, 153, 255,0.2)'),
          borderColor:this.colorloop('rgb(255, 51, 153)'),
         
          borderWidth:1, 
          data:y2
          }
      ]
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
  colorloop(color:string)
  {
    let colors:string[]=[]; 
    for (let i = 0; i < this.length; i++) 
    {
      colors.push(color);
      console.log(colors);
    }
    return colors;
  }
}
