import { Client } from ".././client/client";
import { Dealer } from "./dealer";
import { Deck } from "./deck";
import { Player } from "./player";

const readline = require('readline-sync')

export class Game{
    private _deck: Deck;
    private _players: Player[];
    currentPlayer: Player
    private _dealer: Dealer;

    constructor(playerNames: string[], deck: Deck) {
        this._deck = deck
        this._deck.shuffle();
        this._players = [];
        this._dealer = new Dealer(deck)
        for (let name of playerNames) {
            this._players.push(new Player(name));
        }
    }

    get deck() {
        return this._deck;
    }

    get players() {
        return this._players;
    }

    private dealCards() {
        for (let i = 0; i < 2; i++) {
            for (let player of this._players) {
                player.addCard(this._deck.draw());
            }
            this._dealer.addCard(this._deck.draw())
        }
    }

    public play() {
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
                    console.log(player.toString());
                    if (player.handValue > 21) {
                        console.log(`${player.name} busts!`);
                        break;
                    }
                } else {
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
            } else if (dealerPoints > 21 || playerPoints > dealerPoints) {
                console.log(`${player.name} wins!`);
            } else if (playerPoints === dealerPoints) {
                console.log(`${player.name} pushes.`);// empate entre o apostador e o dealer
            } else {
                console.log(`${player.name} loses.`);
            }
        }
    }
}