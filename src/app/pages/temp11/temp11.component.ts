import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-temp11',
  templateUrl: './temp11.component.html',
  styleUrls: ['./temp11.component.css']
})
export class Temp11Component implements OnInit {
  activePanel: string = "1";

  tempModel: Temp11;
  constructor() {
    this.tempModel = {
      colOneHeader: "",
      colOneText: "",
      colTwoHeader: "",
      colTwoText: "",
      colThreeHeader: "",
      colThreeText: "",
      colFourText: "",
      colFiveText: "",
      colSixText: "",
      colSevenText: "",
      colEightText: "",
      colNineText: "",
      colTenText: "",
      colElevenText: "",
      colTwelveText: ""
    }
  }

  ngOnInit() {
  }
  showPanel(id: string) {
    console.log("id to show:  " + id);
    this.activePanel = id;
  }
  saveAll() {
    console.log("Saved temp model");
    console.log(this.tempModel);
  }
}
