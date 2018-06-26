import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CardService } from '../../../services/card.service';
import { NgForm } from '@angular/forms';
import { Constants } from '../../../Constants';
declare var jquery: any;
declare var $: any;
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-card-data',
  templateUrl: './card-data.component.html',
  styleUrls: ['./card-data.component.css']
})
export class CardDataComponent implements OnInit, OnChanges {
  @Input('selectedCard') selectedCard: CardModel;
  @Input('pillarId') pillarId: string;
  @Output() onSavedSuccessfully: EventEmitter<string> = new EventEmitter;
  cardObject: any;
  selectedButtonIndex: number;
  seletectedImageString: string;
  constructor(
    private CardServices: CardService,
    public spinner: NgxSpinnerService,
  ) {
  }
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
  async AddCard(form: NgForm) {
    if (form.valid) {
      this.spinner.show();
      console.log("Saved card details");
      console.log(this.cardObject);
      try {
        const done = await this.CardServices.addCard(this.cardObject, this.seletectedImageString, this.pillarId);
        this.spinner.hide();
        if (done) {
          this.onSavedSuccessfully.emit("done");
          this.closeModal();
        }
      }
      catch (err) {
        this.spinner.hide();
        window.alert("Failed to save card");
      }

    }
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
  closeModal() {
    $('#edit').modal('hide');
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
      this.seletectedImageString = myReader.result;
    }

    myReader.readAsDataURL(file);

  }
}
