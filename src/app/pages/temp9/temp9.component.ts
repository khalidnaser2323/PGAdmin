import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ChartPopupComponent } from './chart-popup/chart-popup.component';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../../services/card.service';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-temp9',
  templateUrl: './temp9.component.html',
  styleUrls: ['./temp9.component.css']
})
export class Temp9Component implements OnInit {
  @ViewChild('successDialog') private successDialog: SwalComponent;
  tmp: Template9 = {
    percentageData: [],
    color: null,
    labels: [],
    title: "Vision & CBN QEC"
  };
  stages: Array<{ title: string, percentage: number }>
  pillarId: string;
  cardId: string;
  templateId: string;
  payload: any;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private cardService: CardService,
    private _location: Location

  ) {
    this.stages = [];
    this.addNewStage();
    this.route.params.subscribe(params => {
      console.log(params);
      this.pillarId = params.pillar;
      this.cardId = params.card;
      this.templateId = params.tmp;
      this.getCardDetails(this.pillarId, this.cardId);
    });
  }

  ngOnInit() {
  }
  saveSatge(stage: any) {
    console.log("Saved stage");
    console.log(stage);
  }
  async  saveAll() {
    console.log("All stages");
    console.log(this.stages);
    this.formatTmp();
    console.log("Temp value");
    console.log(this.tmp);
    this.payload.data = this.tmp;
    try {
      const done = await this.cardService.updateTemplatePayload(this.pillarId, this.cardId, this.templateId, this.payload);
      if (done) {
        this.successDialog.show();
      }
    } catch (error) {
      console.log(error);
      window.alert("OOPs! something went wrong");
    }

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
  async getCardDetails(pillarId: string, cardId: string) {
    try {
      const cardDetails = await this.cardService.getCardDetails(pillarId, cardId);
      if (cardDetails && cardDetails.templates && cardDetails.templates[this.templateId] && cardDetails.templates[this.templateId].payload) {
        console.log("Template saved payload");
        console.log(cardDetails.templates[this.templateId].payload);
        this.payload = cardDetails.templates[this.templateId].payload;
        if (this.payload.data) {
          this.deformatTmp(this.payload.data);
        }
      }
      else {
        window.alert("Error in loading data!");
      }
    } catch (error) {
      window.alert("Error in loading data!");
    }

  }
  deformatTmp(tmp: Template9) {
    debugger;
    this.stages = [];
    for (let i = 0 ; i < tmp.labels.length; i++) {
      this.stages.push({ title: tmp.labels[i], percentage: tmp.percentageData[i] })
    }
  }
  onConfirm(event: any) {
    console.log("Confirmed");
    this._location.back();
  }
  onBackCliced(){
    this._location.back();
  }
}
