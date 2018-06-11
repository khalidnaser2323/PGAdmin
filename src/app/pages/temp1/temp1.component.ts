import { Component, OnInit } from '@angular/core';
import { Constants } from '../../Constants';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StagesPopUpComponent } from './stages-pop-up/stages-pop-up.component';

@Component({
  selector: 'app-temp1',
  templateUrl: './temp1.component.html',
  styleUrls: ['./temp1.component.css']
})
export class Temp1Component implements OnInit {
  stages: Array<Stage>;
  constructor(public dialog: MatDialog) {
    this.stages = [];

  }

  ngOnInit() {
    this.addNewStage();
  }

  saveStage(stage) {
    console.log("Save stage");
    console.log(stage);
    console.log(this.stages);
  }
  clearStage(stage: Stage) {
    this.stages = this.stages.filter(x => {
      return x.id != stage.id;
    })

  }
  addNewStage() {
    this.stages.push({
      id: Constants.guidGenerator(),
      tempDescribtion: "",
      StagePrice: "",
      percentValue: 0,
      color: "",
      stageNumber: ""
    });
  }
  saveAll() {
    console.log("Save all");
    console.log(this.stages);
  }
  openDialog(): void {
    let dialogRef = this.dialog.open(StagesPopUpComponent, {
      width:"90%",
      data: { stages: this.stages }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
