import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
declare var jquery: any;
declare var $: any;
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { ServiceHandlerProvider } from '../../services/service-handler/service-handler';
import { Constants } from '../../Constants';
import { CardService } from '../../services/card.service';



@Component({
  selector: 'app-child-card',
  templateUrl: './child-card.component.html',
  styleUrls: ['./child-card.component.css']
})
export class ChildCardComponent implements OnInit {
  cards: Array<CardModel>;
  selectedCard: CardModel;
  selectedPillar: any = {};
  myData: LoginResponse;
  pillarId: string;
  newCardTitle: string;

  constructor(
    public serviceHandler: ServiceHandlerProvider,
    private route: ActivatedRoute,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private CardsService: CardService
  ) {

    this.cards = [];
    this.myData = this.storage.get(Constants.USER_DATA);
    this.route.params.subscribe(params => {
      console.log(params);
      this.pillarId = params['pillarId'];
      this.getCards(this.pillarId);
    });
    // this.selectedPillar = this.storage.get(Constants.SELECTED_PILLAR);



  }

  OnSubmit() {
    console.log("submitted");
  }
  ngOnInit() {
  }
  onEditCard(selectedCard: CardModel) {
    console.log("Selected card to edit");
    console.log(selectedCard);
    this.selectedCard = selectedCard;
    this.updateNewCardTitle();
    $('#edit').modal('show');
  }
  async onDeleteCard(selectedCard: CardModel) {
    console.log("Selected card to delete");
    console.log(selectedCard);
    try {
      const done = await this.CardsService.deleteCard(selectedCard._id, this.selectedPillar._id);
      if (done) {
        this.getCards(this.selectedPillar._id);
      }

    }
    catch (error) {
      window.alert("Failed to delete card");
    }
  }
  createNewCard() {
    this.updateNewCardTitle();
    this.selectedCard = null;
    $('#edit').modal('show');
  }
  getCards(pillarId: string) {

    this.CardsService.getCards(pillarId).subscribe((res) => {
      console.log("Get pillar details response");
      console.log(res);
      this.selectedPillar = res;
      if (this.selectedPillar.cards) {
        this.cards = this.selectedPillar.cards;
        if (this.cards[0]) {
          this.cards[0].title = "Plan";
        }
        if (this.cards[1]) {
          this.cards[1].title = "Do";
        }
        if (this.cards[2]) {
          this.cards[2].title = "Check";
        }
        if (this.cards[3]) {
          this.cards[3].title = "Act";
        }
        this.updateNewCardTitle();
      }
    }, err => {
      console.log("Get pillar details error");
      console.error(err);
      window.alert("Error in getting pillar details");
    });
  }
  onSavedSuccessfully(event) {
    console.log("update in cards");
    this.getCards(this.pillarId);
  }
  onCardEdited(done: boolean) {
    if (done) {
      this.getCards(this.selectedPillar._id);
    }
  }
  updateNewCardTitle() {

    switch (this.cards.length) {
      case 0:
        this.newCardTitle = "Plan"
        break;
      case 1:
        this.newCardTitle = "Do";
        break;
      case 2:
        this.newCardTitle = "Check";
        break;
      case 3:
        this.newCardTitle = "Act";
        break;
    }
  }
}
