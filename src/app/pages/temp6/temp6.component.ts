import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConpopupComponent } from './conpopup/conpopup.component';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../../services/card.service';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-temp6',
  templateUrl: './temp6.component.html',
  styleUrls: ['./temp6.component.css']
})
export class Temp6Component implements OnInit {
  @ViewChild('successDialog') private successDialog: SwalComponent;

  chartValues: template6 = {
    label: "",
    xaxisValues: "",
    yaxisValues: "",
    tempDescribtion: "",
    tempName: ""
  }
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

  }

  onsaveTitle() {
    console.log('name&descriptio');
    console.log(this.chartValues);
  }
  async onSaveChartData() {
    console.log("chartData");
    console.log(this.chartValues);
    this.payload.data = this.chartValues;
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
    let dialogRef = this.dialog.open(ConpopupComponent, {
      height: '400px',
      width: '600px',
      data: { chartValues: this.chartValues }
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
          this.chartValues = this.payload.data;
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
  onBackCliced(){
    this._location.back();
  }
}
