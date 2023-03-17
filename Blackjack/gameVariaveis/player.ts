import { Socket } from "net";
import { Card } from "./card";
import { Deck } from "./deck"

export class Player {
  private readonly _name: string;
  private readonly _hand: Card[];
  public socket: Socket = null

  constructor(name: string, socket: Socket) {
    this._name = name;
    this._hand = [];
    this.socket = socket
  }

  get name() {
    return this._name;
  }

  get hand() {
    return this._hand;
  }

  get handValue() {
    let value = 0;
    let aces = 0;
    for (let card of this._hand) {
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

  get isBust() {
    return this.handValue > 21;
  }

  addCard(card: Card) {
    this._hand.push(card);
  }

  toString() {
    let str = `${this._name} tem `;
    for (let i = 0; i < this._hand.length; i++) {
      str += this._hand[i].toString();
      if (i < this._hand.length - 1) {
        str += ", ";
      }
    }
    str += ` (${this.handValue})`;
    return 'ShowHand ' + str;
  }

}