import { Component, OnInit } from '@angular/core';
import { CardService } from '../../../services/card.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-card-data',
  templateUrl: './card-data.component.html',
  styleUrls: ['./card-data.component.css']
})
export class CardDataComponent implements OnInit {
  Image = null;
  constructor(private CardServices: CardService) { }

  ngOnInit() {

  }
  onSelectedImage(event) {
    this.Image = event.target.files[0];
  }
  AddCard(form: NgForm) {
    console.log("new card value");
    console.log(form.value);
    this.CardServices.addCard(<CardModel>form.value);
  }

}
