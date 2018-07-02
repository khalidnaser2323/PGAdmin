import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Temp12connComponent } from './temp12conn/temp12conn.component';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../../services/card.service';
import { SwalComponent } from '@toverux/ngx-sweetalert2';

@Component({
  selector: 'app-temp12',
  templateUrl: './temp12.component.html',
  styleUrls: ['./temp12.component.css']
})
export class Temp12Component implements OnInit {
  @ViewChild('successDialog') private successDialog: SwalComponent;
  pillarId: string;
  cardId: string;
  templateId: string;
  payload: any;
  ChartValues: template6 = {
    label: '',
    xaxisValues: '',
    yaxisValues: '',
    tempDescribtion: "",
    tempName: "",
    tableData: [
      {
        rowID: '0', tableHeader1: ['h1'], tableHeader2: ['h2'], tableHeader3: ['h3'], tableHeader4: ['h4']
        , tableHeader5: ['h5'], tableHeader6: ['h6'], tableHeader7: ['h7']
      },
      {
        rowId: '1', value1: 'value1', value2: 'value2', value3: 'value3'
        , value4: 'value4', value5: 'value5', value6: 'value6'
        , value7: 'value7', value8: 'value8', value9: 'value9'
      },
      {
        rowId: '2', value1: 'value1', value2: 'value2', value3: 'value3'
        , value4: 'value4', value5: 'value5', value6: 'value6'
        , value7: 'value7', value8: 'value8', value9: 'value9'
      },
      {
        rowId: '3', value1: 'value1', value2: 'value2', value3: 'value3'
        , value4: 'value4', value5: 'value5', value6: 'value6'
        , value7: 'value7', value8: 'value8', value9: 'value9'
      }

    ]
  };
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private cardService: CardService
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
  saveTableData() {

    // console.log(this.tableData);
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
    let dialogRef = this.dialog.open(Temp12connComponent, {
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

}
