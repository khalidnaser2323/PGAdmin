import { Component, OnInit, ViewChild } from '@angular/core';
import { DROPZONE_CONFIG, DropzoneComponent, DropzoneDirective } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Constants } from '../../Constants';
import { TeamPopUpComponent } from './team-pop-up/team-pop-up.component';

@Component({
  selector: 'app-temp3',
  templateUrl: './temp3.component.html',
  styleUrls: ['./temp3.component.css']
})
export class Temp3Component implements OnInit {
  @ViewChild(DropzoneDirective) directiveRef?: DropzoneDirective;
  config: DropzoneConfigInterface = {
    url: "/",
    acceptedFiles: 'image/*',
    autoProcessQueue: false,
    maxFiles: 1
  };
  teamMembers: Array<TeamMember> = [];
  constructor(public dialog: MatDialog) {

  }

  ngOnInit() {
    this.addMember();
  }
  addMember() {
    this.teamMembers.push({
      Name: "",
      TeamMemberImg: "img/a1.jfif",
      JobDiscribtion: ""
    });
  }
  saveAll() {
    console.log("All members");
    console.log(this.teamMembers);
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
    let dialogRef = this.dialog.open(TeamPopUpComponent, {
      width: "90%",
      data: { teamMembers: this.teamMembers }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog is closed');
    });
  }
  deleteMember(index: number) {
    this.teamMembers.splice(index, 1);
  }
  saveMember(member: TeamMember) {
    console.log("Saved team member");
    console.log(this.teamMembers);
  }
  onAddedFile(file: any) {
    console.log("added file");
    console.log(file);

  }


}
