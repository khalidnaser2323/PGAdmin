import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChange } from '@angular/core';
import { Constants } from '../../Constants';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-add-edit-pillar-popup',
  templateUrl: './add-edit-pillar-popup.component.html',
  styleUrls: ['./add-edit-pillar-popup.component.css']
})
export class AddEditPillarPopupComponent implements OnInit, OnChanges {
  @Output() onSaveClicked: EventEmitter<Pillar> = new EventEmitter;
  @Input('pillar') selectedPillar: Pillar;
  formPillar: Pillar;

  constructor() {
    this.setNewPillar();
  }

  ngOnInit() {
  }
  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    console.log("On change called");
    console.log(changes);
    if (changes.selectedPillar) {
      if (changes.selectedPillar.currentValue) {
        // this.formPillar = changes.selectedPillar.currentValue;
        /*K.A:Angular passed object by reference. so, making any edit of it will edit the original object in parent component.
         using Object.assign will copy the value of selected pillar. */
        this.formPillar = Object.assign({}, changes.selectedPillar.currentValue);
        console.log("Edit pillar clicked");
        console.log(this.formPillar);
      }
      else {
        console.log("New pillar clicked");
        this.setNewPillar();
      }
    }
  }
  save(form) {
    if (form.valid) {
      this.onSaveClicked.emit(this.formPillar);
      this.setNewPillar();
      //K.A: use jquery to hide the modal from component.
      $('#edit').modal('hide');
    }
    else {
      console.log("form is not valid");
      console.log(form);
    }
  }
  setNewPillar() {
    this.formPillar = this.formPillar = {
      id: Constants.guidGenerator(),
      name: "",
      discription: "",
      pillarImg: "img/img-default.jpg"
    };
  }



}
