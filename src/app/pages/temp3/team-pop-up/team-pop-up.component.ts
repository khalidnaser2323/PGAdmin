import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-team-pop-up',
  templateUrl: './team-pop-up.component.html',
  styleUrls: ['./team-pop-up.component.css']
})
export class TeamPopUpComponent implements OnInit {

  teamMembers: Array<TeamMember>;
  constructor(
    public dialogRef: MatDialogRef<TeamPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.teamMembers = this.data.teamMembers;
  }

  ngOnInit() {
    console.log("passed date");
    console.log(this.teamMembers);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
