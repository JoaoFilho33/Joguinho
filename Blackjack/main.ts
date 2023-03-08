import * as net from 'net'
import { Readline } from 'readline/promises';
import { Client } from './variaveis/client/client';
import { Deck } from './variaveis/gameVariaveis/deck';
import { Game } from './variaveis/gameVariaveis/game';
import { Player } from './variaveis/gameVariaveis/player';

let sockets = []
const server: net.Server = net.createServer((socket: net.Socket) => {
    var clientAddress = `${socket.remoteAddress}:${socket.remotePort}`; 
    console.log(`${Player.name} conectado: ${clientAddress}/n`);
    sockets.push(socket)
    socket.write(`Olá, ${Player.name}!`);

    socket.on('data', (data: Buffer)=>{
        console.log(`${clientAddress}: ${data.toString()}`);
        sockets.forEach((sock) => {
            sock.write(`${sock.remoteAddress}: ${sock.remotePort} disse ${data}\n`);
        });
    });

    socket.on('close', (data) => {
        const index = sockets.findIndex((index) => {
            return (index.remoteAddress===socket.remoteAddress) && (index.remotePort === socket.remotePort);
        });
        if(index !== -1) sockets.splice(index, 1);
        sockets.forEach((sock) => { 
            sock.write(`${clientAddress} disconectado\n`); 
        }); 
        console.log(`Conexão encerrada: ${clientAddress}`);
    });

    socket.on('error', (err) => { 
        console.log(`Ocorreu um erro em ${clientAddress}: ${err.message}`); 
    });
});

server.listen(3000, () => {
    console.log('Servidor inicializando na port a 3000')
})

const readline = require('readline-sync')
let qtdPlayer: number = readline.question("Quandtidade de players: ")
let players: string[] = []
for(let i = 0; i < qtdPlayer; i++){
    players[i] = readline.question(`Player ${i + 1} Seu nome: `)
}

let deck: Deck = new Deck()
let game = new Game(players, deck)

game.play()