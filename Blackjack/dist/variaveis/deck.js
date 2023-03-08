"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deck = void 0;
const card_1 = require("./card");
class Deck {
    constructor() {
        this._cards = [];
        const suits = ["Paus", "Diamantes", "Copas", "Espadas"];
        for (let suit of suits) {
            for (let value = 1; value <= 13; value++) {
                this._cards.push(new card_1.Card(value, suit));
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
exports.Deck = Deck;
