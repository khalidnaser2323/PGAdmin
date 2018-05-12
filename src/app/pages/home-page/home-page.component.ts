import { Component, OnInit, ViewChild } from '@angular/core';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { SweetAlertOptions } from 'sweetalert2';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  @ViewChild('deleteSwal') private deleteSwal: SwalComponent;
  @ViewChild('deleteConfirmedSwal') private deleteConfirmedSwal: SwalComponent;
  deletePopUpOptions: SweetAlertOptions;
  constructor() { }

  ngOnInit() {
  }
  deleteCard() {
    this.deleteConfirmedSwal.show();

  }
  showPopup() {
    this.deletePopUpOptions = {
      title: "Are you sure?",
      text: "You will not be able to recover this card!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      customClass:'swal-popup'
    }
    this.deleteSwal.options = this.deletePopUpOptions;
    this.deleteSwal.show();

  }

}
