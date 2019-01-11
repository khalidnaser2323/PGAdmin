import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../../services/card.service';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { Location } from '@angular/common';
import * as XLSX from 'xlsx';
import { MatDialog } from '@angular/material';
import { PopupComponent } from '../photo-tmp/popup/popup.component';
import { NgxSpinnerService } from 'ngx-spinner';

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
  imageString: string;

  constructor(
    private route: ActivatedRoute,
    private cardService: CardService,
    private _location: Location,
    public dialog: MatDialog,
    public spinner: NgxSpinnerService,

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
    if (this.link != null && this.imageString != null) {
      console.log("Image");
      console.log(this.imageString);
      this.spinner.show();
      console.log("Saved table data");
      console.log(this.link);
      this.payload.data = this.link;
      try {
        const imagePath = this.imageString.startsWith("data:") ? await this.cardService.uploadImage(this.imageString) : this.imageString;
        this.payload.tmpImage = imagePath;
        const done = await this.cardService.updateTemplatePayload(this.pillarId, this.cardId, this.templateId, this.payload);
        this.spinner.hide();
        if (done) {
          this.successDialog.show();
        }
      } catch (error) {
        this.spinner.hide();
        console.log(error);
        window.alert("OOPs! something went wrong");
      }
    }
    else {
      window.alert("Please type link and select image for template");
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
        if (this.payload.tmpImage) {
          this.imageString = this.payload.tmpImage;
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
  handleFileInput(files: FileList) {
    // this.fileToUpload = files.item(0);
    console.log(files);
    this.readThis(files);
  }
  readThis(inputValue: any): void {
    var file: File = inputValue[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      // you can perform an action with readed data here
      console.log(myReader.result);
      this.imageString = myReader.result.toString();
    }

    myReader.readAsDataURL(file);

  }
  openDialog(): void {

    let dialogRef = this.dialog.open(PopupComponent, {
      width: "95%",
      height: "95%",
      maxHeight: "100%",
      maxWidth: "100%",
      data: { imageString: this.imageString }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog is closed');
    });
  }
}
