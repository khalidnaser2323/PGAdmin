import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Constants } from '../../../Constants';

@Component({
  selector: 'app-view-cards',
  templateUrl: './view-cards.component.html',
  styleUrls: ['./view-cards.component.css']
})
export class ViewCardsComponent implements OnInit {
  @Input('card') card: CardModel;
  @Output('onDeleteCardClicked') onDeleteCardClicked: EventEmitter<CardModel> = new EventEmitter();
  @Output('onEditCardClicked') onEditCardClicked: EventEmitter<CardModel> = new EventEmitter();
  imagePath: string = Constants.IMAGE_PATH;

  constructor() { }

  ngOnInit() {
  }
  onCardEditClicked() {
    console.log("Edit card clicked");
    this.onEditCardClicked.emit(this.card);
  }
  onDelete() {
    this.onDeleteCardClicked.emit(this.card);
  }
  onButtonClicked(button: any) {
    console.log("Clicked button");
    console.log(button);
  }

}
