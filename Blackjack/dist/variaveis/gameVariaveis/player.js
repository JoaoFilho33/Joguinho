"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
class Player {
    constructor(name) {
        this.ready = false;
        this._name = name;
        this._hand = [];
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
            }
            else if (card.value >= 10) {
                value += 10;
            }
            else {
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
    addCard(card) {
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
        return str;
    }
}
exports.Player = Player;
