import { Game } from "../gameVariaveis/game";
import { Deck } from "../gameVariaveis/deck";
import { Client } from "./client";
import { isJSDocAugmentsTag } from "typescript";
import { promisify } from "util";

const readline = require('readline-sync')
let players = []

for(let i = 0; i < 2; i++){
    players.push(readline.question(`Player ${i + 1}, Seu nome: `));
}
 
// let player1 = new Client(players[0])
// let player2 = new Client(players[1])


let deck: Deck = new Deck();

const game = new Game(players, deck)


// player1.sendMessage('') 
// .then((data) => { 
//     console.log(`Received: ${data}`); 
// }),
// player2.sendMessage('')
// .then((data) => { 
//     console.log(`Received: ${data}`); 
// })    

game.play()


// .then((data) => {
//     console.log(`Recebido ${data}`);
//     return promisifyClient.sendMessage('Quem é você?');
// }).then((data) => {
//     console.log(`Recebido ${data}`);
//     return promisifyClient.sendMessage('tchau');
// })
// }).catch((err) =>console.error(err));


// game.play()