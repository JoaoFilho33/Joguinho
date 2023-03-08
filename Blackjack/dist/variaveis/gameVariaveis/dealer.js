"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dealer = void 0;
const player_1 = require("./player");
class Dealer extends player_1.Player {
    constructor(deck) {
        super("Dealer");
        this._deck = deck;
        this._mao = [];
    }
    get hand() {
        return this._mao;
    }
    playDealer() {
        console.log("Dealer está jogando...");
        while (this.handValue < 17 && this._deck.cards.length > 0) {
            this.addCard(this._deck.draw());
        }
        console.log(this.toString());
        if (this.handValue > 21) {
            console.log("Dealer busts!");
        }
        else {
            console.log(`Dealer stands at ${this.handValue}`);
        }
    }
}
exports.Dealer = Dealer;
