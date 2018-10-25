import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Constants } from '../../../Constants';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  imagePath: string = Constants.IMAGE_PATH;
  imageString: string;
  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(this.data.imageString);
    this.imageString = this.data.imageString;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
  }
  getImageUrl(imageString: string): string {
    if (imageString.startsWith("data:")) {
      return imageString;
    }
    else {
      return this.imagePath + imageString;
    }

  }

}
