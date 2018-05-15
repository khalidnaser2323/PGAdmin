import { Component, OnInit } from '@angular/core';
import {CardService}from '../../../Services/card.service';
import {NgForm} from '@angular/forms';
import {CardModel}from '../../../Models/CardModel'
@Component({
  selector: 'app-card-data',
  templateUrl: './card-data.component.html',
  styleUrls: ['./card-data.component.css'],
  providers:[CardService]
})
export class CardDataComponent implements OnInit {
  Imadge=null;
  NewCard:CardModel[];
  constructor(private CardServices:CardService ) { }

  ngOnInit() {
   
  }
   onSelectedImadge(event)
  {
    this.Imadge=event.target.files[0];
  }
  AddCard(form:NgForm)
  {
    const value=form.value;
    console.log(value);
    this.NewCard=value;
    this.CardServices.addCard(<CardModel>value);
   console.log("new card value"+this.NewCard)
    this.CardServices.NewCard.subscribe
    (
      (addedCard:CardModel[])=>
      {
        this.NewCard=addedCard;  
      }
    ); 
  }

}
