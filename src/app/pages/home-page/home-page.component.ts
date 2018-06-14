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
  @ViewChild('editSwal') private editPillarSwal: SwalComponent;
  deletePopUpOptions: SweetAlertOptions;
  pillars: Array<Pillar>;
  deletedPillarId: string = null;
  selectedPillar: Pillar = null;
  constructor() {
    // this.pillars = [
    //   {
    //     id: "1",
    //     pillarImg: "img/img-default.jpg",
    //     name: "Leadership Pillar",
    //     discription: "Et suscipit menandri est, ut mea iriure imperdiet, at his docendi."
    //   },
    //   {
    //     id: "2",
    //     pillarImg: "img/img-default.jpg",
    //     name: "Human Resources",
    //     discription: "Et suscipit menandri est, ut mea iriure imperdiet, at his docendi."
    //   }, {
    //     id: "3",
    //     pillarImg: "img/img-default.jpg",
    //     name: "Loss Elimination",
    //     discription: "Et suscipit menandri est, ut mea iriure imperdiet, at his docendi."
    //   }, {
    //     id: "4",
    //     pillarImg: "img/img-default.jpg",
    //     name: "Autonomous Maintenance",
    //     discription: "Et suscipit menandri est, ut mea iriure imperdiet, at his docendi."
    //   }, {
    //     id: "5",
    //     pillarImg: "img/img-default.jpg",
    //     name: "Learning",
    //     discription: "Et suscipit menandri est, ut mea iriure imperdiet, at his docendi."
    //   }, {
    //     id: "6",
    //     pillarImg: "img/img-default.jpg",
    //     name: "Preventive Maintenance",
    //     discription: "Et suscipit menandri est, ut mea iriure imperdiet, at his docendi."
    //   }, {
    //     id: "7",
    //     pillarImg: "img/img-default.jpg",
    //     name: "Initiative Management",
    //     discription: "Et suscipit menandri est, ut mea iriure imperdiet, at his docendi."
    //   }, {
    //     id: "8",
    //     pillarImg: "img/img-default.jpg",
    //     name: "Quality",
    //     discription: "Et suscipit menandri est, ut mea iriure imperdiet, at his docendi."
    //   }, {
    //     id: "9",
    //     pillarImg: "img/img-default.jpg",
    //     name: "Health Safety Environment",
    //     discription: "Et suscipit menandri est, ut mea iriure imperdiet, at his docendi."
    //   }, {
    //     id: "10",
    //     pillarImg: "img/img-default.jpg",
    //     name: "Supply network",
    //     discription: "Et suscipit menandri est, ut mea iriure imperdiet, at his docendi."
    //   }

    // ]
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
  onSaveClicked(event) {
    console.log("Submitted card form");
    console.log(event);
    if (this.selectedPillar == null) {
      // add new pillar
      this.pillars.push(event);
    }
    else {
      //edit an existing pillar
      this.pillars[this.pillars.findIndex(pillar => pillar._id == event._id)] = event;

    }
  }
  setSelectedPillar(pillar: Pillar) {
    console.log("selected pillar");
    console.log(pillar);
    this.selectedPillar = pillar;
  }
}
