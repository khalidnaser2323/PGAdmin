import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-temp1',
  templateUrl: './temp1.component.html',
  styleUrls: ['./temp1.component.css']
})
export class Temp1Component implements OnInit {
  stages: Array<Stage>;
  constructor() {
    this.stages = [
      {
        id: "1",
        price: "",
        percentage: 0,
        details: ""
      },
      {
        id: "2",
        price: "",
        percentage: 0,
        details: ""
      }, {
        id: "3",
        price: "",
        percentage: 0,
        details: ""
      }, {
        id: "4",
        price: "",
        percentage: 0,
        details: ""
      }
    ]
  }

  ngOnInit() {
  }

  saveStage(stage) {
    console.log("Save stage");
    console.log(stage);
    console.log(this.stages);
  }
  clearStage(stage) {
    stage.price = "";
    stage.percentage = 0;
    stage.details = "";
  }
}
