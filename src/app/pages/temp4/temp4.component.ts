import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../../services/card.service';
import { SwalComponent } from '@toverux/ngx-sweetalert2';

@Component({
  selector: 'app-temp4',
  templateUrl: './temp4.component.html',
  styleUrls: ['./temp4.component.css']
})
export class Temp4Component implements OnInit {
  temp: any;
  @ViewChild('successDialog') private successDialog: SwalComponent;
  pillarId: string;
  cardId: string;
  templateId: string;
  payload: any;
  constructor(
    private route: ActivatedRoute,
    private cardService: CardService
  ) {
    this.temp = {
      tableData: [
        { rowID: '0', tableHeader: 'Table Header' },
        { rowId: '1', value1: 'value1', value2: 'value2', value3: "Value3" },
        { rowId: '2', value1: 'value1', value2: 'value2', value3: 'value3', value4: "value4" },
        { rowId: '3', value1: 'value1' },
        { rowId: '4', value1: 'value1', value2: 'value2', value3: 'value3', value4: "value4" }
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
  }
  async save() {
    console.log("Saved table data");
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
}
