import { Component, OnInit, ViewChild } from '@angular/core';
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
export class CardDataComponent implements OnInit {
  @ViewChild(DropzoneDirective) directiveRef?: DropzoneDirective;
  cardObject: any;
  buttonsArray: Array<{ buttonTitle: string, buttonTempId: string, buttonId: string }>;
  selectedButtonIndex: number;
  constructor(
    private CardServices: CardService
  ) {
    this.cardObject = {};
    this.buttonsArray = [];
  }
  config: DropzoneConfigInterface = {
    url: "/",
    acceptedFiles: 'image/*',
    autoProcessQueue: false,
    maxFiles: 1
  };
  ngOnInit() {

  }
  AddCard(form: NgForm) {
    if (form.valid && this.buttonsArray.length > 0) {
      console.log("buttons array");
      console.log(this.buttonsArray);
      console.log("Saved card details");
      this.cardObject["buttons"] = this.buttonsArray;
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
    if (this.buttonsArray.length < 3) {
      this.buttonsArray.push({ buttonTitle: "button name", buttonTempId: "1", buttonId: Constants.guidGenerator() });
    }
  }
  deleteButton(deletedButton: any) {
    console.log("Button to be cancelled");
    console.log(deletedButton);
    this.buttonsArray = this.buttonsArray.filter(button => {
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
    this.buttonsArray[this.selectedButtonIndex].buttonTempId = selectedTempId;
  }
}
