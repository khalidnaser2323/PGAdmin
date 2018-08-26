import { Component, OnInit, ViewChild } from '@angular/core';
import { Constants } from '../../Constants';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StagesPopUpComponent } from './stages-pop-up/stages-pop-up.component';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../../services/card.service';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { Location } from '@angular/common';
import { ColorPickerService } from 'ngx-color-picker';


@Component({
  selector: 'app-temp1',
  templateUrl: './temp1.component.html',
  styleUrls: ['./temp1.component.css']
})
export class Temp1Component implements OnInit {
  @ViewChild('successDialog') private successDialog: SwalComponent;
  stages: Array<Stage>;
  pillarId: string;
  cardId: string;
  templateId: string;
  color: string = "red";
  payload: any;
  toggle: boolean = false;
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private cardService: CardService,
    private _location: Location,
    private cpService: ColorPickerService
  ) {
    this.stages = [];
    this.route.params.subscribe(params => {
      console.log(params);
      this.pillarId = params.pillar;
      this.cardId = params.card;
      this.templateId = params.tmp;
      this.getCardDetails(this.pillarId, this.cardId);
    });

  }

  ngOnInit() {
    this.addNewStage();
  }

  saveStage(stage) {
    console.log("Save stage");
    console.log(stage);
    console.log(this.stages);
  }
  clearStage(stage: Stage) {
    this.stages = this.stages.filter(x => {
      return x.id != stage.id;
    })

  }
  addNewStage() {
    this.stages.push({
      id: Constants.guidGenerator(),
      tempDescribtion: "",
      StagePrice: "",
      percentValue: 0,
      color: "red",
      stageNumber: ""
    });
  }
  async saveAll() {
    console.log("Save all");
    console.log(this.stages);
    this.payload.data = this.stages;
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
  onConfirm(event: any) {
    console.log("Confirmed");
    this._location.back();
  }
  onBackCliced() {
    this._location.back();
  }
  openDialog(): void {
    let dialogRef = this.dialog.open(StagesPopUpComponent, {
      width: "90%",
      data: { stages: this.stages }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
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
          this.stages = this.payload.data;
        }
      }
      else {
        window.alert("Error in loading data!");
      }
    } catch (error) {
      window.alert("Error in loading data!");
    }

  }
  onColorChanged(color: string, index: number) {
    console.log("Selected color");
    console.log(color);
    console.log("Stage index");
    console.log(index);
  }

}
