import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../../services/card.service';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { Temp10PopUpComponent } from './temp10-pop-up/temp10-pop-up.component';
import { Location } from '@angular/common';


@Component({
  selector: 'app-temp10',
  templateUrl: './temp10.component.html',
  styleUrls: ['./temp10.component.css']
})
export class Temp10Component implements OnInit {
  @ViewChild('successDialog') private successDialog: SwalComponent;
  pillarId: string;
  cardId: string;
  templateId: string;
  payload: any;
  temp: Temp10;
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private cardService: CardService,
    private _location: Location

  ) {
    this.temp = {
      overViewTitle: "",
      stages: [
        {
          color: "red",
          title: "",
          details: "",
          percentage: 0
        },
        {
          color: "blue",
          title: "",
          details: "",
          percentage: 0
        },
        {
          color: "pink",
          title: "",
          details: "",
          percentage: 0
        }
      ]
    };
    this.route.params.subscribe(params => {
      console.log(params);
      this.pillarId = params.pillar;
      this.cardId = params.card;
      this.templateId = params.tmp;
      this.getCardDetails(this.pillarId, this.cardId);
    });
  }

  ngOnInit() {
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
  ngOnDestroy() {
    console.log("Component is destroyed");
    this.cardService.updateTemplatePayload(this.pillarId, this.cardId, this.templateId, this.payload, false);
    window.onbeforeunload = (e) => {
      //just un registering listener
    };
  }
  async save() {
    console.log("Saved template");
    console.log(this.temp);
    this.payload.data = this.temp;
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
    let dialogRef = this.dialog.open(Temp10PopUpComponent, {
      width: '90%',
      data: { ChartValues: this.temp }
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
          this.temp = this.payload.data;
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

}
