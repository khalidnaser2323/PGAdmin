import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Constants } from '../../Constants';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../../services/card.service';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { Location } from '@angular/common';
import { PopupComponent } from '../photo-tmp/popup/popup.component';

@Component({
  selector: 'app-photo-tmp',
  templateUrl: './photo-tmp.component.html',
  styleUrls: ['./photo-tmp.component.css']
})
export class PhotoTmpComponent implements OnInit {
  @ViewChild('successDialog') private successDialog: SwalComponent;
  pillarId: string;
  cardId: string;
  templateId: string;
  payload: any;
  imageString: string;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private cardService: CardService,
    public spinner: NgxSpinnerService,
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
    console.log("Image");
    console.log(this.imageString);
    this.spinner.show();
    try {
      let imageUrl = "";
      if (this.imageString.startsWith("data:")) {
        imageUrl = await this.cardService.uploadImage(this.imageString);
      }
      else {
        imageUrl = this.imageString;
      }
      this.payload.data = imageUrl;
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

  openDialog(): void {

    let dialogRef = this.dialog.open(PopupComponent, {
      width: "99%",
      height: "99%",
      maxHeight: "100%",
      maxWidth: "100%",
      data: { imageString: this.imageString }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog is closed');
    });
  }


  handleFileInput(files: FileList, memberIndex: number) {
    // this.fileToUpload = files.item(0);
    console.log(files);
    this.readThis(files, memberIndex);
  }
  readThis(inputValue: any, memberIndex: number): void {
    var file: File = inputValue[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      // you can perform an action with readed data here
      console.log(myReader.result);
      this.imageString = myReader.result.toString();
    }

    myReader.readAsDataURL(file);

  }
  async getCardDetails(pillarId: string, cardId: string) {
    try {
      const cardDetails = await this.cardService.getCardDetails(pillarId, cardId);
      if (cardDetails && cardDetails.templates && cardDetails.templates[this.templateId] && cardDetails.templates[this.templateId].payload) {
        console.log("Template saved payload");
        console.log(cardDetails.templates[this.templateId].payload);
        this.payload = cardDetails.templates[this.templateId].payload;
        if (this.payload.data) {
          this.imageString = this.payload.data;
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
