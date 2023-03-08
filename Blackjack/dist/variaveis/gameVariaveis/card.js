"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
class Card {
    constructor(value, suit) {
        this._value = value;
        this._naipe = suit;
    }
    get value() {
        return this._value;
    }
    get suit() {
        return this._naipe;
    }
    toString() {
        let valueStr;
        if (this._value == 1) {
            valueStr = "Ás";
        }
        else if (this._value == 11) {
            valueStr = "Valete";
        }
        else if (this._value == 12) {
            valueStr = "Dama";
        }
        else if (this._value == 13) {
            valueStr = "Rei";
        }
        else {
            valueStr = `${this._value}`;
        }
        return `${valueStr} de ${this._naipe}`;
    }
}
exports.Card = Card;
