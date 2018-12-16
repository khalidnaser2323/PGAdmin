import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../../services/card.service';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { Location } from '@angular/common';
import * as XLSX from 'xlsx';

declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-temp7',
  templateUrl: './temp7.component.html',
  styleUrls: ['./temp7.component.css']
})
export class Temp7Component implements OnInit {
  temp: any;
  @ViewChild('successDialog') private successDialog: SwalComponent;
  pillarId: string;
  cardId: string;
  templateId: string;
  payload: any;
  data: any;
  link: string;
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
    console.log("Saved table data");
    console.log(this.link);
    this.payload.data = this.link;
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
          // this.data = this.payload.data;
          // $('#mytable').jexcel({ data: this.data, defaultColWidth: "300" });
          this.link = this.payload.data;

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
  onFileChange(evt: any) {

    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
      $('#mytable').jexcel({ data: this.data, defaultColWidth: "300" });
    };
    reader.readAsBinaryString(target.files[0]);
  }
}
