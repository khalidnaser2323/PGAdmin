import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Constants } from '../../Constants';
import { TablePopUpComponent } from './table-pop-up/table-pop-up.component';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../../services/card.service';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-temp2',
  templateUrl: './temp2.component.html',
  styleUrls: ['./temp2.component.css']
})
export class Temp2Component implements OnInit {
  licenseData: LicenseModel;
  @ViewChild('successDialog') private successDialog: SwalComponent;
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
    this.licenseData = {
      overView: "",
      tableData: []
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
    this.addRow();
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
  saveRow(row: any) {
    console.log("Saved row");
    console.log(row);
    console.log(this.licenseData);
  }
  deleteRow(index: number) {
    this.licenseData.tableData.splice(index, 1);
  }
  addRow() {
    this.licenseData.tableData.push({
      OrderDate: "",
      Region: "",
      Rep: "",
      Item: "",
      Units: "",
      UnitCost: "",
      TotalCost: ""
    });
  }
  async saveAll() {
    console.log("Save all");
    console.log(this.licenseData);
    this.payload.data = this.licenseData;
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
    let dialogRef = this.dialog.open(TablePopUpComponent, {
      width: "90%",
      data: { licence: this.licenseData }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog is closed');
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
          this.licenseData = this.payload.data;
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
