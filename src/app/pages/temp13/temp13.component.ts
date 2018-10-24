import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PieChartComponent } from './chart-popup/chart-popup.component';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../../services/card.service';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-temp13',
  templateUrl: './temp13.component.html',
  styleUrls: ['./temp13.component.css']
})
export class Temp13Component implements OnInit {
  @ViewChild('successDialog') private successDialog: SwalComponent;
  tmp1: Template9 = {
    percentageData: [],
    color: null,
    labels: [],
    title: ""
  };
  tmp2: Template9 = {
    percentageData: [],
    color: null,
    labels: [],
    title: ""
  }
  tmp3: Template9 = {
    percentageData: [],
    color: null,
    labels: [],
    title: ""
  }
  tmp: Array<Template9>;
  firstTempStages: Array<{ title: string, percentage: number }>
  secondTempStages: Array<{ title: string, percentage: number }>
  thirdTempStages: Array<{ title: string, percentage: number }>
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
    this.firstTempStages = [];
    this.thirdTempStages = [];
    this.secondTempStages = [];
    this.addNewStage(1);
    this.addNewStage(2);
    this.addNewStage(3);
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
    if (this.firstTempStages.length > 0 && this.secondTempStages.length > 0 && this.thirdTempStages.length > 0) {
      console.log("All stages");
      console.log(this.firstTempStages);
      console.log(this.secondTempStages);
      console.log(this.thirdTempStages);
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
    else {
      alert("Please add at least one stage to each pie");
    }

  }
  formatTmp() {
    let labels1 = [], percentageData1 = [];
    for (let stage of this.firstTempStages) {
      labels1.push(stage.title);
      percentageData1.push(stage.percentage);
    }
    this.tmp1.percentageData = percentageData1;
    this.tmp1.labels = labels1;


    let labels2 = [], percentageData2 = [];
    for (let stage of this.secondTempStages) {
      labels2.push(stage.title);
      percentageData2.push(stage.percentage);
    }
    this.tmp2.percentageData = percentageData2;
    this.tmp2.labels = labels2;


    let labels3 = [], percentageData3 = [];
    for (let stage of this.thirdTempStages) {
      labels3.push(stage.title);
      percentageData3.push(stage.percentage);
    }
    this.tmp3.percentageData = percentageData3;
    this.tmp3.labels = labels3;

    this.tmp = [
      this.tmp1, this.tmp2, this.tmp3
    ]

  }
  drawChart() {
    this.formatTmp();
    let dialogRef = this.dialog.open(PieChartComponent, {
      width: "90%",
      data: this.tmp
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog is closed');
    });
  }
  // pieOrder the order of wich pie you want to add a stage to, 1 for the first tmp, 2 for the second, 3 for the third;
  addNewStage(pieOrder: number) {
    switch (pieOrder) {
      case 1:
        this.firstTempStages.push({
          title: "",
          percentage: 0
        });
        break;
      case 2:
        this.secondTempStages.push({
          title: "",
          percentage: 0
        });
        break;
      case 3:
        this.thirdTempStages.push({
          title: "",
          percentage: 0
        });
        break;
      default:
        break;

    }

  }
  deleteSatge(index: number, pieOrder: number) {
    switch (pieOrder) {
      case 1:
        this.firstTempStages.splice(index, 1);
        break;
      case 2:
        this.secondTempStages.splice(index, 1);
        break;
      case 3:
        this.thirdTempStages.splice(index, 1);
        break;
      default:
        break;
    }

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
  deformatTmp(tmp: Array<Template9>) {
    this.firstTempStages = [];
    for (let i = 0; i < tmp[0].labels.length; i++) {
      this.firstTempStages.push({ title: tmp[0].labels[i], percentage: tmp[0].percentageData[i] });
    }
    this.secondTempStages = [];
    for (let i = 0; i < tmp[1].labels.length; i++) {
      this.secondTempStages.push({ title: tmp[1].labels[i], percentage: tmp[1].percentageData[i] });
    }
    this.thirdTempStages = [];
    for (let i = 0; i < tmp[2].labels.length; i++) {
      this.thirdTempStages.push({ title: tmp[2].labels[i], percentage: tmp[2].percentageData[i] });
    }
  }
  onConfirm(event: any) {
    console.log("Confirmed");
    this._location.back();
  }
  onBackCliced() {
    this._location.back();
  }

}
