import * as net from 'net'
import { Deck } from './variaveis/gameVariaveis/deck';
import { Game } from './variaveis/gameVariaveis/game';
import { Player } from './variaveis/gameVariaveis/player';
import { Client } from './variaveis/client/client';
import { ClientRequest } from 'http';

const readline = require('readline-sync')

let sockets = []
let players = []
let deck: Deck = new Deck();
let game: Game = new Game(players, deck)

const server: net.Server = net.createServer((socket: net.Socket) => {
    let clientAddress = `${socket.remoteAddress}:${socket.remotePort}`; 
    console.log(`Novo player conectado: ${clientAddress}/n`);
    sockets.push(socket)
    socket.write(`Olá, ${Player.name}!`);

    socket.on('data', (data: Buffer)=>{
        const message = data.toString().trim()
        console.log(`Mensagem recebida de ${clientAddress}: ${message}`);
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
    console.log('Servidor inicializado na porta 3000')
})
