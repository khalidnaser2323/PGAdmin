import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-stages-pop-up',
  templateUrl: './stages-pop-up.component.html',
  styleUrls: ['./stages-pop-up.component.css']
})
export class StagesPopUpComponent implements OnInit {
  // @Input('stages') stages: Array<Stage>;
  stages: Array<Stage>;
  constructor(public dialogRef: MatDialogRef<StagesPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.stages = this.data.stages;
     }

  ngOnInit() {
    console.log("Passed stages");
    console.log(this.data.stages);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
