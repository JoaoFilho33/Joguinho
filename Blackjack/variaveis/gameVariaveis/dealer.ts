import { Card } from "./card";
import { Deck } from "./deck";
import { Player } from "./player";

export class Dealer extends Player{
    private readonly _deck: Deck
    private readonly _mao: Card[]
    
    constructor(deck: Deck) {
      super("Dealer")
      this._deck = deck
      this._mao = []
    } 
  
    get hand() {
      return this._mao
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