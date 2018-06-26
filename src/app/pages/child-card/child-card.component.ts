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

  constructor(
    public serviceHandler: ServiceHandlerProvider,
    private route: ActivatedRoute,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private CardsService: CardService
  ) {
    // this.cards = [
    //   {
    //     cardId: "id1",
    //     title: "Title1",
    //     description: "Discription1",
    //     imageUrl: "img/img-default.jpg",
    //     buttons: [
    //       {
    //         buttonId: "1",
    //         buttonTempId: "1",
    //         buttonTitle: "Button1"
    //       },
    //       {
    //         buttonId: "2",
    //         buttonTempId: "2",
    //         buttonTitle: "Button2"
    //       },
    //       {
    //         buttonId: "3",
    //         buttonTempId: "3",
    //         buttonTitle: "Button3"
    //       }
    //     ]
    //   },
    //   {
    //     cardId: "id2",
    //     title: "Title2",
    //     description: "Discription2",
    //     imageUrl: "img/img-default.jpg",
    //     buttons: [
    //       {
    //         buttonId: "1",
    //         buttonTempId: "4",
    //         buttonTitle: "Button1"
    //       },
    //       {
    //         buttonId: "2",
    //         buttonTempId: "5",
    //         buttonTitle: "Button2"
    //       },
    //       {
    //         buttonId: "3",
    //         buttonTempId: "6",
    //         buttonTitle: "Button3"
    //       }
    //     ]
    //   },
    //   {
    //     cardId: "id3",
    //     title: "Title3",
    //     description: "Discription3",
    //     imageUrl: "img/img-default.jpg",
    //     buttons: [
    //       {
    //         buttonId: "1",
    //         buttonTempId: "7",
    //         buttonTitle: "Button1"
    //       },
    //       {
    //         buttonId: "2",
    //         buttonTempId: "8",
    //         buttonTitle: "Button2"
    //       },
    //       {
    //         buttonId: "3",
    //         buttonTempId: "9",
    //         buttonTitle: "Button3"
    //       }
    //     ]
    //   },
    //   {
    //     cardId: "id4",
    //     title: "Title4",
    //     description: "Discription4",
    //     imageUrl: "img/img-default.jpg",
    //     buttons: [
    //       {
    //         buttonId: "1",
    //         buttonTempId: "10",
    //         buttonTitle: "Button1"
    //       },
    //       {
    //         buttonId: "2",
    //         buttonTempId: "11",
    //         buttonTitle: "Button2"
    //       },
    //       {
    //         buttonId: "3",
    //         buttonTempId: "12",
    //         buttonTitle: "Button3"
    //       }
    //     ]
    //   }
    // ]
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
    $('#edit').modal('show');
  }
  onDeleteCard(selectedCard: CardModel) {
    console.log("Selected card to delete");
    console.log(selectedCard);
    this.cards = this.cards.filter(card => {
      return card._id != selectedCard._id;
    });
  }
  createNewCard() {
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
}
