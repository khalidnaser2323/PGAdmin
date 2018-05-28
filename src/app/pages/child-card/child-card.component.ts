import { Component, OnInit } from '@angular/core';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-child-card',
  templateUrl: './child-card.component.html',
  styleUrls: ['./child-card.component.css']
})
export class ChildCardComponent implements OnInit {

  cards: Array<CardModel>;
  selectedCard: CardModel;
  constructor() {
    this.cards = [
      {
        cardId: "id1",
        title: "Title1",
        description: "Discription1",
        imageUrl: "img/img-default.jpg",
        buttons: [
          {
            buttonId: "1",
            buttonTempId: "1",
            buttonTitle: "Button1"
          },
          {
            buttonId: "2",
            buttonTempId: "2",
            buttonTitle: "Button2"
          },
          {
            buttonId: "3",
            buttonTempId: "3",
            buttonTitle: "Button3"
          }
        ]
      },
      {
        cardId: "id2",
        title: "Title2",
        description: "Discription2",
        imageUrl: "img/img-default.jpg",
        buttons: [
          {
            buttonId: "1",
            buttonTempId: "4",
            buttonTitle: "Button1"
          },
          {
            buttonId: "2",
            buttonTempId: "5",
            buttonTitle: "Button2"
          },
          {
            buttonId: "3",
            buttonTempId: "6",
            buttonTitle: "Button3"
          }
        ]
      },
      {
        cardId: "id3",
        title: "Title3",
        description: "Discription3",
        imageUrl: "img/img-default.jpg",
        buttons: [
          {
            buttonId: "1",
            buttonTempId: "7",
            buttonTitle: "Button1"
          },
          {
            buttonId: "2",
            buttonTempId: "8",
            buttonTitle: "Button2"
          },
          {
            buttonId: "3",
            buttonTempId: "9",
            buttonTitle: "Button3"
          }
        ]
      },
      {
        cardId: "id4",
        title: "Title4",
        description: "Discription4",
        imageUrl: "img/img-default.jpg",
        buttons: [
          {
            buttonId: "1",
            buttonTempId: "10",
            buttonTitle: "Button1"
          },
          {
            buttonId: "2",
            buttonTempId: "11",
            buttonTitle: "Button2"
          },
          {
            buttonId: "3",
            buttonTempId: "12",
            buttonTitle: "Button3"
          }
        ]
      }
    ]
    // this.cards = [];
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
      return card.cardId != selectedCard.cardId;
    });
  }
  createNewCard() {
    this.selectedCard = null;
    $('#edit').modal('show');
  }
}
