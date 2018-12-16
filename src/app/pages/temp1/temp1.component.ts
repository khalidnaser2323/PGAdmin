import { Component, OnInit, ViewChild } from '@angular/core';
import { Constants } from '../../Constants';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StagesPopUpComponent } from './stages-pop-up/stages-pop-up.component';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../../services/card.service';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

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
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private cardService: CardService,
    private _location: Location,
    public spinner: NgxSpinnerService,
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
      stageNumber: "",
      icon: "img/logo.png"
    });
  }
  async saveAll() {
    console.log("Save all");
    console.log(this.stages);
    this.spinner.show();
    try {
      for (let i in this.stages) {
        if (this.stages[i].icon && this.stages[i].icon.startsWith("data:")) {
          const iconId = await this.cardService.uploadImage(this.stages[i].icon);
          this.stages[i].icon = iconId;
        }
        else {
          continue;
        }
      }
      this.payload.data = this.stages;
      const done = await this.cardService.updateTemplatePayload(this.pillarId, this.cardId, this.templateId, this.payload);
      this.spinner.hide();
      if (done) {
        this.successDialog.show();

      }
    } catch (error) {
      console.log(error);
      this.spinner.hide();
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

  handleFileInput(files: FileList, stageIndex: number) {
    // this.fileToUpload = files.item(0);
    console.log(files);
    this.readThis(files, stageIndex);
  }
  readThis(inputValue: any, stageIndex: number): void {
    var file: File = inputValue[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      // you can perform an action with readed data here
      console.log(myReader.result);
      this.stages[stageIndex].icon = myReader.result.toString();
    }

    myReader.readAsDataURL(file);

  }

}
