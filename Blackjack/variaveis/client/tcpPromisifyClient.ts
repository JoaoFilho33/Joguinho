import { Game } from "../gameVariaveis/game";
import { Deck } from "../gameVariaveis/deck";
import { Client } from "./client";

const readline = require('readline-sync')

let name: string = readline.question("Seu nome: ")

const promisifyClient = new Client(name); 
// promisifyClient.sendMessage('Olá')
// .then((data) => {
//     console.log(`Recebido ${data}`);
//     return promisifyClient.sendMessage('Quem é você?');
// }).then((data) => {
//     console.log(`Recebido ${data}`);
//     return promisifyClient.sendMessage('tchau');
// }).then((data) => { 
//     console.log(`Received: ${data}`); 
//     return promisifyClient.sendMessage('exit'); 
// }).catch((err) =>console.error(err));


const playerNames = ["Alice", "Bob"];
const deck = new Deck()
const game = new Game(playerNames, deck);

// game.play()