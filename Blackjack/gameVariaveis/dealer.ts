import { Card } from "./card";
import { Deck } from "./deck";
import { Player } from "./player";

export class Dealer{
    private readonly _deck: Deck
    private readonly _hand: Card[]

    constructor(deck: Deck) {
      this._deck = deck
      this._hand = []
    } 
  
    get hand() {
      return this._hand
    }

    get handValue() {
      let value = 0;
      let aces = 0;
      for (let card of this.hand) {
        if (card.value == 1) {
          aces++;
          value += 11;
        } else if (card.value >= 10) {
          value += 10;
        } else {
          value += card.value;
        }
      }
      while (value > 21 && aces > 0) {
        value -= 10;
        aces--;
      }
      return value;
    }
  
    addCard(card: Card) {
      this._hand.push(card);
    }

    playDealer() {
      console.log("Dealer está jogando...");
  
      while (this.handValue < 17 && this._deck.cards.length > 0) {
        this.addCard(this._deck.draw());
      }
    
      console.log(this.toString());
  
      if (this.handValue > 21) {
        console.log("Dealer busts!");
      } else {
        console.log(`Dealer stands at ${this.handValue}`);
      }
    }
  }