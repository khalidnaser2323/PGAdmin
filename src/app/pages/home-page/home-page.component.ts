import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { SweetAlertOptions } from 'sweetalert2';
import { Constants } from '../../Constants';
import { ServiceHandlerProvider } from '../../services/service-handler/service-handler';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  @ViewChild('deleteSwal') private deleteSwal: SwalComponent;
  @ViewChild('deleteConfirmedSwal') private deleteConfirmedSwal: SwalComponent;
  @ViewChild('editSwal') private editPillarSwal: SwalComponent;
  deletePopUpOptions: SweetAlertOptions;
  pillars: Array<Pillar>;
  deletedPillarId: string = null;
  selectedPillar: Pillar = null;
  myData: LoginResponse;
  imagePath: string = Constants.IMAGE_PATH;
  constructor(
    public serviceHandler: ServiceHandlerProvider,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    public router: Router
  ) {
    this.myData = this.storage.get(Constants.USER_DATA);
    this.getPillars();
  }

  ngOnInit() {
  }
  confirmDelete() {
    if (this.deletedPillarId != null) {
      this.pillars = this.pillars.filter(pillar => { return pillar._id != this.deletedPillarId });
    }
    this.deleteConfirmedSwal.show();

  }
  deletePillar(pillarId: string) {
    console.log("Pillar id to delete: " + pillarId);
    this.deletedPillarId = pillarId;
    this.deletePopUpOptions = {
      title: "Are you sure?",
      text: "You will not be able to recover this card!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!"
    }
    this.deleteSwal.options = this.deletePopUpOptions;
    this.deleteSwal.show();

  }
  onPillarSaved(event) {
    console.log("Submitted card form");
    console.log(event);
    this.getPillars();

  }
  setSelectedPillar(pillar: Pillar) {
    console.log("selected pillar");
    console.log(pillar);
    this.selectedPillar = pillar;
  }
  getPillars() {
    this.serviceHandler.runService(Constants.BASE_URL + "section/list", "GET", this.myData.token).subscribe((res) => {
      console.log("Get pillars response");
      console.log(res);
      this.pillars = res;
    }, err => {
      console.log("Get pillars error");
      console.error(err);
      window.alert("Error in getting pillars");
    })
  }
  publishPillar(selectedPillar: Pillar) {
    const action = selectedPillar.public ? "/set-private" : "/set-public";
    this.serviceHandler.runService(Constants.BASE_URL + "section/" + selectedPillar._id + action, "POST", this.myData.token).subscribe((res) => {
      console.log("Modify pillar status response");
      console.log(res);
      if (res.done) {
        this.getPillars();
      }
    }, err => {
      console.log("Modify pillar status error");
      console.error(err);
      window.alert("Failed to update status!");
    });
  }
  navigateToPillarDetails(selectedPillar: Pillar) {
    // this.storage.set(Constants.SELECTED_PILLAR, selectedPillar);
    this.router.navigate(['cards', selectedPillar._id]);
  }
}
