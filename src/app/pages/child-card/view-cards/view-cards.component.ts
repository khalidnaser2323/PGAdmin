import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Constants } from '../../../Constants';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddButtonComponent } from '../add-button/add-button.component';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { SweetAlertOptions } from 'sweetalert2';
import { CardService } from '../../../services/card.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-cards',
  templateUrl: './view-cards.component.html',
  styleUrls: ['./view-cards.component.css']
})
export class ViewCardsComponent implements OnInit {
  @Input('card') card: CardModel;
  @Input('pillarId') pillarId: string;
  @Output('onDeleteCardClicked') onDeleteCardClicked: EventEmitter<CardModel> = new EventEmitter();
  @Output('onEditCardClicked') onEditCardClicked: EventEmitter<CardModel> = new EventEmitter();
  @Output('onCardEdited') onCardEdited: EventEmitter<boolean> = new EventEmitter();
  imagePath: string = Constants.IMAGE_PATH;
  @ViewChild('promptSwal') private promptSwal: SwalComponent;
  promptPoPUpOptions: SweetAlertOptions;
  clickedButtonId: string;
  constructor(
    public dialog: MatDialog,
    public cardService: CardService,
    public spinner: NgxSpinnerService,
    public router: Router

  ) { }

  ngOnInit() {
  }
  onCardEditClicked() {
    console.log("Edit card clicked");
    this.onEditCardClicked.emit(this.card);
  }
  onDelete() {
    this.onDeleteCardClicked.emit(this.card);
  }
  onButtonClicked(button: any) {
    console.log("Clicked button");
    console.log(button);
    this.clickedButtonId = button.key;
    this.promptPoPUpOptions = {
      title: button.value,
      text: "Choose action required",
      type: "question",
      showCancelButton: true,
      confirmButtonText: "Fill data",
      cancelButtonText: "Delete button",
      showCloseButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false

    };
    this.promptSwal.options = this.promptPoPUpOptions;
    this.promptSwal.show();
  }
  addNewButton() {
    if (Object.keys(this.card.buttons).length < 3) {
      let dialogRef = this.dialog.open(AddButtonComponent, {
        width: "90%",
        data: {
          pillarId: this.pillarId,
          cardId: this.card._id,
          buttonId: Constants.guidGenerator()
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog is closed');
        console.log(result);
        if (result) {
          this.onCardEdited.emit(true);
        }
      });
    }
  }
  async fillData(event: any) {
    console.log("Clicked fill data");
    console.log(event);
    // this.spinner.show();
    try {
      const cardDetails = await this.cardService.getCardDetails(this.pillarId, this.card._id);
      // this.spinner.hide();
      if (cardDetails && cardDetails.templates && cardDetails.templates[this.clickedButtonId] && cardDetails.templates[this.clickedButtonId].payload && cardDetails.templates[this.clickedButtonId].payload.templateType) {
        const path = Constants.APP_TEMPLATES.find(tmp => { return tmp.tempId == cardDetails.templates[this.clickedButtonId].payload.templateType }).path;
        this.router.navigate([path, { pillar: this.pillarId, card: this.card._id, tmp: this.clickedButtonId }]);
      }
      else {
        window.alert("Something went wrong!");
      }
    } catch (error) {
      window.alert("Something went wrong!");
    }

  }
  async deleteButton(event: any) {
    console.log("Clicked delete button");
    console.log(event);
    console.log(this.clickedButtonId);
    if (event === "cancel") {
      try {
        const done = await this.cardService.pullTemplate(this.pillarId, this.card._id, this.clickedButtonId);
        if (done) {
          this.onCardEdited.emit(true);
        }
      }
      catch (error) {
        console.log(error);
        window.alert("Failed to delete button");
      }
    }
  }
  changePublicPrivateStatus() {
    try {
      const done = this.cardService.publishCard(this.pillarId, this.card._id, this.card.public);
      if (done) {
        this.onCardEdited.emit(true);
      }
    } catch (error) {
      console.log(error);
      window.alert("Failed to change card status");
    }
  }
}
