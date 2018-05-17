import { Injectable } from '@angular/core';

@Injectable()
export class CardService {
  cards: CardModel[] = [];
  constructor() { }

  getCards(): CardModel[] {
    return this.cards;
  }
  addCard(newCard: CardModel) {
    this.cards.push(newCard);
    console.log("Array after add");
    console.log(this.cards);
  }

}
