import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CardService } from '../../../services/card.service';
import { NgForm } from '@angular/forms';
import { DROPZONE_CONFIG, DropzoneComponent, DropzoneDirective } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { Constants } from '../../../Constants';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-card-data',
  templateUrl: './card-data.component.html',
  styleUrls: ['./card-data.component.css']
})
export class CardDataComponent implements OnInit, OnChanges {
  @ViewChild(DropzoneDirective) directiveRef?: DropzoneDirective;
  @Input('selectedCard') selectedCard: CardModel;
  cardObject: any;
  selectedButtonIndex: number;
  constructor(
    private CardServices: CardService
  ) {
  }
  config: DropzoneConfigInterface = {
    url: "/",
    acceptedFiles: 'image/*',
    autoProcessQueue: false,
    maxFiles: 1
  };
  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log("Edit component: On change called");
    console.log(changes);
    if (changes.selectedCard) {
      if (changes.selectedCard.currentValue) {
        this.cardObject = Object.assign({}, changes.selectedCard.currentValue);
      }
      else {
        this.cardObject = {};
      }
    }
  }
  AddCard(form: NgForm) {
    if (form.valid && this.cardObject.buttons.length > 0) {
      console.log("Saved card details");
      console.log(this.cardObject);
      this.CardServices.addCard(this.cardObject);
      let dropzone = this.directiveRef.dropzone();
      //K.A: put api url after getting new card id
      dropzone.options.url = "/newURL";
      dropzone.processQueue();
      $('#edit').modal('hide');
    }
  }
  onUploadError(event) {
    console.error(event);
  }
  onUploadSuccess(event) {
    console.log(event);
  }
  addNewButton() {
    console.log("Add button clicked");
    if (this.cardObject.buttons == undefined) {
      this.cardObject.buttons = [];
    }
    if (this.cardObject.buttons.length < 3) {
      this.cardObject.buttons.push({ buttonTitle: "button name", buttonTempId: "1", buttonId: Constants.guidGenerator() });
    }
  }
  deleteButton(deletedButton: any) {
    console.log("Button to be cancelled");
    console.log(deletedButton);
    this.cardObject.buttons = this.cardObject.buttons.filter(button => {
      return button.buttonId != deletedButton.buttonId
    });
  }
  getTempURL(button: any) {
    const selectedTmp = Constants.APP_TEMPLATES.find(tmp => tmp.tempId == button.buttonTempId);
    return selectedTmp.imageURL;
  }

  setSelectedButtonIndex(index: number) {
    this.selectedButtonIndex = index;
  }
  onSelectedTemplate(selectedTempId: string) {
    this.cardObject.buttons[this.selectedButtonIndex].buttonTempId = selectedTempId;
  }
  closeModal(){
    $('#edit').modal('hide');
  }
}
