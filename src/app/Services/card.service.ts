import {CardModel} from '../Models/CardModel';
import {EventEmitter} from '@angular/core';
export class CardService

{
    NewCard= new EventEmitter<CardModel[]>();
    Card:CardModel[];
    addCard(card:CardModel)
    {
        console.log("the values here"+card);
            this.Card.push(card);
            
            this.NewCard.emit(this.Card.slice());
            
    }
    viewCard()
    {
            return this.Card.slice();
    }
    
}