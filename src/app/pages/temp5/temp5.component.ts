import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Popup5Component } from './popup5/popup5.component'
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../../services/card.service';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-temp5',
  templateUrl: './temp5.component.html',
  styleUrls: ['./temp5.component.css'],
  providers: []
})
export class Temp5Component implements OnInit {
  @ViewChild('successDialog') private successDialog: SwalComponent;
  ChartValues: template5 = {
    tempName: "",
    tempDescribtion: "",
    label1: "",
    label2: "",
    xaxisValues: "",
    y1Values: "",
    y2Values: "",
    label3: "",
    y3Values: "",
    linearVariableData: "",
    linearVariableLabel: "",
    color1: "red",
    color2: "red",
    color3: "red",
    linearColor: "red"
  };
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
    this.route.params.subscribe(params => {
      console.log(params);
      this.pillarId = params.pillar;
      this.cardId = params.card;
      this.templateId = params.tmp;
      this.getCardDetails(this.pillarId, this.cardId);
    });
  }
  ngOnInit() {
    console.log('oninit');
    console.log(this.ChartValues);
    //this.chartV.emit(this.ChartValues);
    window.onbeforeunload = (e) => {
      e = e || window.event;

      // For IE and Firefox prior to version 4
      if (e) {
        e.returnValue = 'Sure?';
      }
      this.freeTemplate();
      // For Safari
      return 'Sure?';
    };
  }
  async freeTemplate() {
    console.log("Do something");
    this.cardService.updateTemplatePayload(this.pillarId, this.cardId, this.templateId, this.payload, false);
  }
  async onSaveChartData() {
    console.log("chartData");
    console.log(this.ChartValues);
    this.payload.data = this.ChartValues;
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

  openDialog(): void {
    let dialogRef = this.dialog.open(Popup5Component, {
      height: '400px',
      width: '600px',
      data: { ChartValues: this.ChartValues }
    });
  }
  async getCardDetails(pillarId: string, cardId: string) {
    try {
      const cardDetails = await this.cardService.getCardDetails(pillarId, cardId);
      if (cardDetails && cardDetails.templates && cardDetails.templates[this.templateId] && cardDetails.templates[this.templateId].payload) {
        console.log("Template saved payload");
        console.log(cardDetails.templates[this.templateId].payload);
        this.payload = cardDetails.templates[this.templateId].payload;
        if (this.payload.data) {
          this.ChartValues = this.payload.data;
        }
      }
      else {
        window.alert("Error in loading data!");
      }
    } catch (error) {
      window.alert("Error in loading data!");
    }

  }
  onConfirm(event: any) {
    console.log("Confirmed");
    this._location.back();
  }
  onBackCliced() {
    this._location.back();
  }
  ngOnDestroy() {
    console.log("Component is destroyed");
    this.cardService.updateTemplatePayload(this.pillarId, this.cardId, this.templateId, this.payload, false);
    window.onbeforeunload = (e) => {
      //just un registering listener
    };
  }
}
