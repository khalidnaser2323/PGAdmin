import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Constants } from '../../Constants';
import { TablePopUpComponent } from './table-pop-up/table-pop-up.component';
import { DROPZONE_CONFIG, DropzoneComponent, DropzoneDirective } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

@Component({
  selector: 'app-temp2',
  templateUrl: './temp2.component.html',
  styleUrls: ['./temp2.component.css']
})
export class Temp2Component implements OnInit {
  @ViewChild(DropzoneDirective) directiveRef?: DropzoneDirective;
  licenseData: LicenseModel;
  config: DropzoneConfigInterface = {
    url: "/",
    acceptedFiles: 'image/*',
    autoProcessQueue: false,
    maxFiles: 1
  };
  constructor(public dialog: MatDialog) {
    this.licenseData = {
      overView: "",
      tableData: []
    }

  }

  ngOnInit() {
    this.addRow();
  }
  saveRow(row: any) {
    console.log("Saved row");
    console.log(row);
    console.log(this.licenseData);
  }
  deleteRow(index: number) {
    this.licenseData.tableData.splice(index, 1);
  }
  addRow() {
    this.licenseData.tableData.push({
      OrderDate: "",
      Region: "",
      Rep: "",
      Item: "",
      Units: "",
      UnitCost: "",
      TotalCost: ""
    });
  }
  saveAll() {
    console.log("Save all");
    console.log(this.licenseData);
    let dropzone = this.directiveRef.dropzone();
    //K.A: put api url after getting new card id
    dropzone.options.url = "/newURL";
    dropzone.processQueue();
  }
  onUploadError(event) {
    console.error(event);
  }
  onUploadSuccess(event) {
    console.log(event);
  }
  openDialog(): void {
    let dialogRef = this.dialog.open(TablePopUpComponent, {
      width: "90%",
      data: { licence: this.licenseData }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog is closed');
    });
  }
}
