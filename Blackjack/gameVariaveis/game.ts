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

        public winner_index(): number {
            let winnerIndex = -1;
            //let highestScore = -1;
            for (let i = 0; i < this._players.length; i++) {
            const player = this._players[i];
            if (player.handValue <= 21) {
                //highestScore = player.handValue;
                if (player.handValue > this._dealer.handValue) {
                    winnerIndex = i
                }
            }
            else {
                winnerIndex = 2
            }
            }
            return winnerIndex;
        }

        public dealCards() {
            for (let i = 0; i < this.players.length; i++) {
                for (let player of this._players) {
                    player.addCard(this._deck.draw());
                }
            }
            this._dealer.addCard(this._deck.draw())
        }

        public async play() {
            //this._dealer.addCard(this._deck.draw());

                let player = this.players[0]
                player.addCard(this._deck.draw());
                //player.socket.write(player.toString());

                console.log(`\nÉ o turno do ${player.name}`)

                while (true) {
                    player.socket.write(player.toString());
                    
                    let action = await once(player.socket, 'data');
                    console.log('recebeu action', action.toString())


                    // console.log("1.1", action.toString() == 's')

                    if(action.toString() == 's'){
                        player.socket.write('stand Você parou! Agora é a vez do outro jogador')
                        break
                    }

                    let a = player.handValue
                    // console.log("2.1", a > 21)

                    if (a > 21) {
                        // console.log(`${player.name} busts!`);
                        player.socket.write(`Você ${player.name} perdeu!`)
                        break;
                    }

                    //console.log("passou")
                    //player.addCard(this._deck.draw());
                    console.log(player.toString());
                }

                player = this.players[1]
                player.addCard(this._deck.draw());

                while (true) {
                    player.socket.write(player.toString());


                    
                    let action = await once(player.socket, 'data');
                    console.log('recebeu action', action.toString())

                    
                    console.log("1.2", action.toString() == 's')
                    
                    if(action.toString() == 's'){
                        player.socket.write('stand Você parou! Agora é a vez do outro jogador')
                        break
                    }

                    let a = player.handValue

                    console.log("2.2", a > 21)

                    if (a > 21) {
                        // console.log(`${player.name} busts!`);
                        player.socket.write(`Você ${player.name} perdeu!`)
                        break;
                    }

                    //console.log("passou")
                    //player.addCard(this._deck.draw());
                    console.log(player.toString());
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
            // player.socket.write(`Game over!`);
            // this.socket.end();

            this.players[0].socket.end()
            this.players[1].socket.end()
        }
    }

