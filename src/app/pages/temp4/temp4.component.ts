import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-temp4',
  templateUrl: './temp4.component.html',
  styleUrls: ['./temp4.component.css']
})
export class Temp4Component implements OnInit {
  temp: any;
  constructor() {
    this.temp = {
      tableData: [
        { rowID: '0', tableHeader: 'Table Header' },
        { rowId: '1', value1: 'value1', value2: 'value2', value3: "Value3" },
        { rowId: '2', value1: 'value1', value2: 'value2', value3: 'value3', value4: "value4" },
        { rowId: '3', value1: 'value1' },
        { rowId: '4', value1: 'value1', value2: 'value2', value3: 'value3', value4: "value4" }
      ]
    }
  }

  ngOnInit() {
  }
  save() {
    console.log("Saved table data");
    console.log(this.temp);
  }
}
