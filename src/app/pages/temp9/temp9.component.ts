import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ChartPopupComponent } from './chart-popup/chart-popup.component';

@Component({
  selector: 'app-temp9',
  templateUrl: './temp9.component.html',
  styleUrls: ['./temp9.component.css']
})
export class Temp9Component implements OnInit {
  tmp: Template9 = {
    percentageData: [],
    color: null,
    labels: [],
    title: "Vision & CBN QEC"
  };
  stages: Array<{ title: string, percentage: number }>
  constructor(public dialog: MatDialog) {
    this.stages = [];
  }

  ngOnInit() {
  }
  saveSatge(stage: any) {
    console.log("Saved stage");
    console.log(stage);
  }
  saveAll() {
    console.log("All stages");
    console.log(this.stages);
    this.formatTmp();
    console.log("Temp value");
    console.log(this.tmp);
  }
  formatTmp() {
    let labels = [], percentageData = [];
    for (let stage of this.stages) {
      labels.push(stage.title);
      percentageData.push(stage.percentage);
    }
    this.tmp.percentageData = percentageData;
    this.tmp.labels = labels;
  }
  drawChart() {
    this.formatTmp();
    let dialogRef = this.dialog.open(ChartPopupComponent, {
      width: "90%",
      data: this.tmp
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog is closed');
    });
  }
  addNewStage() {
    this.stages.push({
      title: "",
      percentage: 0
    });
  }
  deleteSatge(index: number) {
    this.stages.splice(index, 1);

  }
}
