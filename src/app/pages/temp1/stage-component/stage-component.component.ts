import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { Constants } from '../../../Constants';

@Component({
  selector: 'app-stage-component',
  templateUrl: './stage-component.component.html',
  styleUrls: ['./stage-component.component.css']
})
export class StageComponentComponent implements OnInit {
  ctx: any;
  chart = [];
  // stage:Stage;
  @Input() stage: Stage;
  imagePath: string = Constants.IMAGE_PATH;

  @ViewChild('canvas') canvasRef: ElementRef;
  constructor() { }

  ngOnInit() {
    console.log("Passed stage from parent ");
    console.log(this.stage);
    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    this.chart = new Chart(this.ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          label: 'percent',
          data: [this.stage.percentValue, this.rest(this.stage.percentValue)],
          backgroundColor: [this.stage.color != '' ? this.stage.color : 'rgb(255, 133, 102)', 'rgb(214, 214, 194)'],
          borderWidth: '15',

        }],
        labels: ['STAGE %', 'REST OF PROJECT'],
      },
      options: {
        title: {
          display: true,
          text: this.stage.stageNumber,
          position: 'bottom',
          fontSize: '30',
          fontFamily: ' Courier New',
          fontColor: this.stage.color != '' ? this.stage.color : 'rgb(255, 133, 102)'
        },
        cutoutPercentage: 70,
      }
    });
  }
  rest(x: number) {
    return 100 - x;
  }
  getImageUrl(stage: Stage): string {
    if (stage.icon) {
      if (stage.icon.startsWith("data:")) {
        return stage.icon;
      }
      else {
        return this.imagePath + stage.icon;
      }

    }
  }
}
