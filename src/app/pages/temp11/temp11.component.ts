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
  pillarId: string;
  cardId: string;
  templateId: string;
  payload: any;
  slides: Array<{ colHeader: string, colCells: Array<string> }> = [
    {
      colHeader: "Header 1",
      colCells: [
        "Cell1",
        "Cell2",
        "cell3"
      ]
    }
  ];
  constructor(
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
  async saveAll() {
    console.log("Saved temp model");
    console.log(this.slides);
    this.payload.data = this.slides;
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
          this.slides = this.payload.data;
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
  trackByFn(index, item) {
    return index; // or item.id
  }
  addColum() {
    console.log("add column clicked");
    this.slides.push({
      colHeader: "Type col header",
      colCells: [
        "Type col cells"
      ]
    });
  }
  addCell(slideIndex: number) {
    this.slides[slideIndex].colCells.push("Type new cell ");
  }
  deleteColumn(slideIndex: number) {
    this.slides.splice(slideIndex, 1);
  }
  deleteCell(slideIndex: number, cellIndex: number) {
    this.slides[slideIndex].colCells.splice(cellIndex, 1);
  }
}
