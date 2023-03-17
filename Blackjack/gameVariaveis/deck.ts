import { Card } from "./card";

export class Deck {
  private readonly _cards: Card[];

  constructor() {
    this._cards = [];
    const suits = ["Paus", "Ouros", "Copas", "Espadas"];
    for (let suit of suits) {
      for (let value = 1; value <= 13; value++) {
        this._cards.push(new Card(value, suit));
      }
    }
  }

  get cards() {
    return this._cards;
  }

  shuffle() {
    for (let i = this._cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this._cards[i], this._cards[j]] = [this._cards[j], this._cards[i]];
    }

  }

  draw() {
    return this._cards.pop();
  }
}
