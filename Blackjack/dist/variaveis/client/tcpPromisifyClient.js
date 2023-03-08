"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const game_1 = require("../gameVariaveis/game");
const deck_1 = require("../gameVariaveis/deck");
const client_1 = require("./client");
const readline = require('readline-sync');
let name = readline.question("Seu nome: ");
const promisifyClient = new client_1.Client(name);
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
const deck = new deck_1.Deck();
const game = new game_1.Game(playerNames, deck);
// game.play()
