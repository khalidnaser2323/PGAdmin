import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Constants } from '../../../Constants';
declare var jquery: any;
declare var $: any;
import { CardService } from '../../../services/card.service';


@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.css']
})
export class AddButtonComponent implements OnInit {

  selectedTmpURL: string;
  selectedTempId: string = "1";
  buttonName: string;
  // buttonId: string;
  constructor(
    public dialogRef: MatDialogRef<AddButtonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private CardServices: CardService
  ) {
    console.log(data);
    // this.buttonId = data;
    this.getTempURL("1");
  }

  ngOnInit() {
  }
  getTempURL(tmpId: string) {
    const selectedTmp = Constants.APP_TEMPLATES.find(tmp => tmp.tempId == tmpId);
    if (selectedTmp) {
      this.selectedTmpURL = selectedTmp.imageURL;
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  closeModal() {
    this.dialogRef.close();
  }
  onSelectedTemplate(selectedTempId: string) {
    console.log("selected template id");
    console.log(selectedTempId);
    this.selectedTempId = selectedTempId;
    this.getTempURL(selectedTempId);
  }
  openTemplateDialog() {
    $("#template").modal({ backdrop: false });
  }
  async save() {
    if (this.buttonName != undefined && this.buttonName != "") {
      try {
        const done = await this.CardServices.pushNewTemplate(this.buttonName, this.data.buttonId, this.selectedTempId, this.data.pillarId, this.data.cardId)
        if (done) {
          this.dialogRef.close(true);
        }
      }
      catch (error) {
        console.log(error);
        window.alert("Failed to add button");
      }
    }
  }
}
