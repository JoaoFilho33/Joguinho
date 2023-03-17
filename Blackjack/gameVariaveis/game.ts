import { once } from "events";
import { Socket } from "net";
import { Dealer } from "./dealer";
import { Deck } from "./deck";
import { Player } from "./player";

const readline = require('readline-sync')

export class Game{
    private _deck: Deck;
    private _players: Player[];
    currentPlayer: Player
    private _dealer: Dealer;
    socket: Socket

    constructor(playerNames: Player[], deck: Deck) {
        this._deck = deck
        this._deck.shuffle();
        this._players = playerNames;
        this._dealer = new Dealer(deck)
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

    public async play() {
        this.dealCards();
        
        this._dealer.addCard(this._deck.draw());

        for (let player of this._players) {

            player.socket.write(player.toString());
            
            console.log('continuou')
            while (true) {

                player.socket.write(`Jogada Do you want to hit or stand? (h/s)`);
                let action = await once(player.socket, 'data');
                

                console.log(action.toString())

                if(action.toString().trim().toLocaleLowerCase() == 's'){
                    break
                }
                
                player.addCard(this._deck.draw());
                console.log(player.toString());

                if (player.handValue > 21) {
                    console.log(`${player.name} busts!`);
                    break;
                }
                
            }
        } 
    
        this._dealer.playDealer();

        for (let player of this._players) {
            let playerPoints = player.handValue;
            let dealerPoints = this._dealer.handValue;

            if (playerPoints > 21) {
                console.log(`${player.name} loses.`);
            } else if (dealerPoints > 21 || playerPoints > dealerPoints) {
                console.log(`${player.name} wins!`);
            } else if (playerPoints === dealerPoints) {
                console.log(`${player.name} pushes.`);
            } else {
                console.log(`${player.name} loses.`);
            }
        }
    }

}

