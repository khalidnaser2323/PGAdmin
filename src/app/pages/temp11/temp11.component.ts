import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../../services/card.service';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-temp11',
  templateUrl: './temp11.component.html',
  styleUrls: ['./temp11.component.css']
})
export class Temp11Component implements OnInit {
  @ViewChild('successDialog') private successDialog: SwalComponent;
  activePanel: string = "1";
  tempModel: Temp11;
  pillarId: string;
  cardId: string;
  templateId: string;
  payload: any;
  constructor(
    private route: ActivatedRoute,
    private cardService: CardService,
    private _location: Location

  ) {
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
  }
  showPanel(id: string) {
    console.log("id to show:  " + id);
    this.activePanel = id;
  }
  async saveAll() {
    console.log("Saved temp model");
    console.log(this.tempModel);
    this.payload.data = this.tempModel;
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
  async getCardDetails(pillarId: string, cardId: string) {
    try {
      const cardDetails = await this.cardService.getCardDetails(pillarId, cardId);
      if (cardDetails && cardDetails.templates && cardDetails.templates[this.templateId] && cardDetails.templates[this.templateId].payload) {
        console.log("Template saved payload");
        console.log(cardDetails.templates[this.templateId].payload);
        this.payload = cardDetails.templates[this.templateId].payload;
        if (this.payload.data) {
          this.tempModel = this.payload.data;
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
