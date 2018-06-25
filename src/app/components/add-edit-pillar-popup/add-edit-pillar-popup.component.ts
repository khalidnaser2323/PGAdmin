import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChange, ViewChild, Inject } from '@angular/core';
import { Constants } from '../../Constants';
import { DROPZONE_CONFIG, DropzoneComponent, DropzoneDirective } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { ServiceHandlerProvider } from '../../services/service-handler/service-handler';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { SweetAlertOptions } from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';


declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-add-edit-pillar-popup',
  templateUrl: './add-edit-pillar-popup.component.html',
  styleUrls: ['./add-edit-pillar-popup.component.css']
})
export class AddEditPillarPopupComponent implements OnInit, OnChanges {
  @ViewChild(DropzoneDirective) directiveRef?: DropzoneDirective;
  @Output() onPillarSaved: EventEmitter<boolean> = new EventEmitter;
  @Input('pillar') selectedPillar: Pillar;
  formPillar: Pillar;
  seletectedImageString: string;

  config: DropzoneConfigInterface = {
    url: "/",
    acceptedFiles: 'image/*',
    autoProcessQueue: false,
    maxFiles: 1
  };

  @ViewChild('errorDialog') private errorDialog: SwalComponent;
  dialogOptions: SweetAlertOptions;
  myData: LoginResponse;
  constructor(
    public serviceHandler: ServiceHandlerProvider,
    public spinner: NgxSpinnerService,
    @Inject(SESSION_STORAGE) private storage: StorageService,
  ) {
    this.myData = this.storage.get(Constants.USER_DATA);
  }

  ngOnInit() {

  }
  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    console.log("On change called");
    console.log(changes);
    if (changes.selectedPillar) {
      if (changes.selectedPillar.currentValue) {
        // this.formPillar = changes.selectedPillar.currentValue;
        /*K.A:Angular passed object by reference. so, making any edit of it will edit the original object in parent component.
         using Object.assign will copy the value of selected pillar. */
        this.formPillar = Object.assign({}, changes.selectedPillar.currentValue);
        console.log("Edit pillar clicked");
        console.log(this.formPillar);
      }
      else {
        console.log("New pillar clicked");
        this.setNewPillar();
      }
    }
  }
  save(form) {
    if (form.valid) {
      this.spinner.show();
      // this.onSaveClicked.emit(this.formPillar);
      // this.setNewPillar();
      console.log("Submitted form");
      console.log(form.value);
      const reqeustOptions: any = {
        url: this.formPillar._id != "" ? Constants.BASE_URL + "section/" + this.formPillar._id : Constants.BASE_URL + "section",
        method: this.selectedPillar ? "PUT" : "POST",
        requestBody: {
          "title": form.value.title,
          "subtitle": form.value.subtitle
        }
      }
      this.serviceHandler.runService(reqeustOptions.url, reqeustOptions.method, this.myData.token, reqeustOptions.requestBody).subscribe(response => {
        console.log(response);
        this.spinner.hide();
        if (this.seletectedImageString) {
          const request = {
            "data": this.seletectedImageString
          }
          const url = Constants.BASE_URL + "section/" + (response.id == undefined ? this.formPillar._id : response.id) + "/image";
          this.spinner.show();
          this.serviceHandler.runService(url, "PUT", this.myData.token, request).subscribe(res => {
            this.spinner.hide();
            console.log("Upload image string response");
            console.log(res);
            this.setNewPillar();
            this.onPillarSaved.emit(true);
            // K.A: use jquery to hide the modal from component.
            $('#edit').modal('hide');
          }, err => {
            this.spinner.hide();
            console.log("Upload image string error");
            console.error(err);
            window.alert("Error in saving pillar");
          })
        }
        else {
          this.setNewPillar();
          this.onPillarSaved.emit(true);
          // K.A: use jquery to hide the modal from component.
          $('#edit').modal('hide');
        }

      }, error => {
        this.spinner.hide();
        console.log(error);
        window.alert("Error in saving pillar");
      });

    }
    else {
      console.log("form is not valid");
      console.log(form);
      window.alert("Please fill pillar details!");
    }
  }

  setNewPillar() {
    this.formPillar = this.formPillar = {
      _id: "",
      title: "",
      subtitle: "",
      imageID: "img/img-default.jpg",
      public: false
    };
    this.seletectedImageString = undefined;
  }
  handleFileInput(files: FileList) {
    // this.fileToUpload = files.item(0);
    console.log(files);
    this.readThis(files);
  }
  readThis(inputValue: any): void {
    var file: File = inputValue[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      // you can perform an action with readed data here
      console.log(myReader.result);
      this.seletectedImageString = myReader.result;
    }

    myReader.readAsDataURL(file);

  }
}
