"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const client_1 = require("./client/client");
const player_1 = require("./player");
const readline = require('readline-sync');
class Game extends client_1.Client {
    constructor(playerNames, deck) {
        super();
        this._deck = deck;
        this._deck.shuffle();
        this._players = [];
        this._dealer = new player_1.Dealer(deck);
        for (let name of playerNames) {
            this._players.push(new player_1.Player(name));
        }
        this.init();
    }
    get deck() {
        return this._deck;
    }
    get players() {
        return this._players;
    }
    dealCards() {
        for (let i = 0; i < 2; i++) {
            for (let player of this._players) {
                player.addCard(this._deck.draw());
            }
            this._dealer.addCard(this._deck.draw());
        }
    }
    play() {
        this.init();
        this.dealCards();
        for (let player of this._players) {
            console.log(player.toString());
        }
        this._dealer.addCard(this._deck.draw());
        //console.log(`Dealer's face-up card is ${this._dealer.hand[0].toString()}`);
        for (let player of this._players) {
            while (true) {
                let choice = readline.question(`${player.name}, do you want to hit or stand? (h/s)`);
                if (choice.toLowerCase() === "h") {
                    player.addCard(this._deck.draw());
                    this.sendMessage(player.toString());
                    if (player.handValue > 21) {
                        this.sendMessage(`${player.name} busts!`);
                        break;
                    }
                }
                else {
                    break;
                }
            }
        }
        this._dealer.playDealer();
        //this._dealer.toString()
        // get vitorioso
        for (let player of this._players) {
            let playerPoints = player.handValue;
            let dealerPoints = this._dealer.handValue;
            if (playerPoints > 21) {
                console.log(`${player.name} loses.`);
            }
            else if (dealerPoints > 21 || playerPoints > dealerPoints) {
                console.log(`${player.name} wins!`);
            }
            else if (playerPoints === dealerPoints) {
                console.log(`${player.name} pushes.`); // empate entre o apostador e o dealer
            }
            else {
                console.log(`${player.name} loses.`);
            }
        }
    }
}
exports.Game = Game;
