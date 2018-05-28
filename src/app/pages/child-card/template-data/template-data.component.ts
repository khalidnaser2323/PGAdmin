import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChange } from '@angular/core';
import { Constants } from '../../../Constants';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-template-data',
  templateUrl: './template-data.component.html',
  styleUrls: ['./template-data.component.css']
})
export class TemplateDataComponent implements OnInit, OnChanges {
  @Output() onSelectedTemplate: EventEmitter<string> = new EventEmitter;
  @Input() selectedTmpId: string;

  templates: Array<TemplateModel>;
  selectedTempId: string;
  constructor() {
    this.templates = Constants.APP_TEMPLATES;
    this.selectedTempId = this.selectedTmpId;
  }

  ngOnInit() {
  }
  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    // console.log("On change called");
    // console.log(changes);
    if (changes.selectedTmpId) {
      if (changes.selectedTmpId.currentValue) {
        this.selectedTempId = changes.selectedTmpId.currentValue;
        console.log(this.selectedTempId);
      }
    }
  }
  onTemplateSelected(selectedTempId: string) {
    this.selectedTempId = selectedTempId;
    this.onSelectedTemplate.emit(selectedTempId);
    $('#template').modal('hide');
  }
}
