import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-edit-pillar-popup',
  templateUrl: './add-edit-pillar-popup.component.html',
  styleUrls: ['./add-edit-pillar-popup.component.css']
})
export class AddEditPillarPopupComponent implements OnInit {
  @Output() onSaveClicked: EventEmitter<any> = new EventEmitter;
  constructor() { }

  ngOnInit() {
  }
  save() {
    this.onSaveClicked.emit("Save clicked!");
  }

}
