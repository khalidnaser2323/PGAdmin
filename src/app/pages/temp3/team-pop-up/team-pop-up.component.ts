import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Constants } from '../../../Constants';

@Component({
  selector: 'app-team-pop-up',
  templateUrl: './team-pop-up.component.html',
  styleUrls: ['./team-pop-up.component.css']
})
export class TeamPopUpComponent implements OnInit {

  teamMembers: Array<TeamMember>;
  imagePath: string = Constants.IMAGE_PATH;
  constructor(
    public dialogRef: MatDialogRef<TeamPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(this.data.teamMembers);
    this.teamMembers = this.data.teamMembers;
  }

  ngOnInit() {
    console.log("passed date");
    console.log(this.teamMembers);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  getImageUrl(teamMember: TeamMember): string {
    if (teamMember.TeamMemberImg.startsWith("data:")) {
      return teamMember.TeamMemberImg;
    }
    else {
      return this.imagePath + teamMember.TeamMemberImg;
    }

  }
}
