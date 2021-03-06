import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TeamPopUpComponent } from './team-pop-up/team-pop-up.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../../services/card.service';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-temp3',
  templateUrl: './temp3.component.html',
  styleUrls: ['./temp3.component.css']
})
export class Temp3Component implements OnInit {
  @ViewChild('successDialog') private successDialog: SwalComponent;
  teamMembers: Array<TeamMember> = [];
  pillarId: string;
  cardId: string;
  templateId: string;
  payload: any;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private cardService: CardService,
    public spinner: NgxSpinnerService,
    private _location: Location
  ) {
    this.route.params.subscribe(params => {
      console.log(params);
      this.pillarId = params.pillar;
      this.cardId = params.card;
      this.templateId = params.tmp;
      this.getCardDetails(this.pillarId, this.cardId);
    });
  }

  ngOnInit() {
    this.addMember();
    window.onbeforeunload = (e) => {
      e = e || window.event;

      // For IE and Firefox prior to version 4
      if (e) {
        e.returnValue = 'Sure?';
      }
      this.freeTemplate();
      // For Safari
      return 'Sure?';
    };
  }
  async freeTemplate() {
    console.log("Do something");
    this.cardService.updateTemplatePayload(this.pillarId, this.cardId, this.templateId, this.payload, false);
  }
  ngOnDestroy() {
    console.log("Component is destroyed");
    this.cardService.updateTemplatePayload(this.pillarId, this.cardId, this.templateId, this.payload, false);
    window.onbeforeunload = (e) => {
      //just un registering listener
    };
  }
  addMember() {
    this.teamMembers.push({
      Name: "",
      TeamMemberImg: "img/a1.jfif",
      JobDiscribtion: "",
      memberRole: ""
    });
  }
  async saveAll() {
    console.log("All members");
    console.log(this.teamMembers);
    // this.payload.data = this.teamMembers;
    this.spinner.show();
    try {
      for (let i in this.teamMembers) {
        if (this.teamMembers[i].TeamMemberImg.startsWith("data:")) {
          const memberImageId = await this.cardService.uploadImage(this.teamMembers[i].TeamMemberImg);
          this.teamMembers[i].TeamMemberImg = memberImageId;
        }
        else {
          continue;
        }
      }
      this.payload.data = this.teamMembers;
      const done = await this.cardService.updateTemplatePayload(this.pillarId, this.cardId, this.templateId, this.payload);
      this.spinner.hide();
      if (done) {
        this.successDialog.show();
      }
    } catch (error) {
      this.spinner.hide();
      console.log(error);
      window.alert("OOPs! something went wrong");
    }
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

  handleFileInput(files: FileList, memberIndex: number) {
    // this.fileToUpload = files.item(0);
    console.log(files);
    this.readThis(files, memberIndex);
  }
  readThis(inputValue: any, memberIndex: number): void {
    var file: File = inputValue[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      // you can perform an action with readed data here
      console.log(myReader.result);
      this.teamMembers[memberIndex].TeamMemberImg = myReader.result.toString();
    }

    myReader.readAsDataURL(file);

  }
  async getCardDetails(pillarId: string, cardId: string) {
    try {
      const cardDetails = await this.cardService.getCardDetails(pillarId, cardId);
      if (cardDetails && cardDetails.templates && cardDetails.templates[this.templateId] && cardDetails.templates[this.templateId].payload) {
        console.log("Template saved payload");
        console.log(cardDetails.templates[this.templateId].payload);
        this.payload = cardDetails.templates[this.templateId].payload;
        if (this.payload.data) {
          this.teamMembers = this.payload.data;
        }
      }
      else {
        window.alert("Error in loading data!");
      }
    } catch (error) {
      window.alert("Error in loading data!");
    }

  }
  onConfirm(event: any) {
    console.log("Confirmed");
    this._location.back();
  }
  onBackCliced() {
    this._location.back();
  }
}
