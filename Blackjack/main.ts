import * as net from 'net'
import { Deck } from './gameVariaveis/deck';
import { Game } from './gameVariaveis/game';
import { Player } from './gameVariaveis/player';
import { ClientRequest } from 'http';

const readline = require('readline-sync')

let sockets = []
let players = []
let deck: Deck = new Deck();
let game: Game = new Game(players, deck)

const server: net.Server = net.createServer((socket: net.Socket) => {

    console.log('Client connected:', socket.remoteAddress, socket.remotePort);

    //let clientAddress = `${socket.remoteAddress}:${socket.remotePort}`; 
    //console.log(`Novo player conectado: ${clientAddress}/n`);
    //sockets.push(socket)
    //socket.write(`Olá, ${Player.name}!`);

    socket.on('data', (data: Buffer)=>{
        const message = data.toString().trim()

        let player: Player

        let [action, ...params] = message.split(' ')

        if(action == 'Login'){
            player = new Player(params[0], socket)
            players.push(player)
        }


        if(players.length == 2){
            gameStart(players)
        }else{
            socket.write('Aguarde o segundo Player')
        }




    });
/*
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
    });*/
});

server.listen(3000, () => {
    console.log('Servidor inicializado na porta 3000')
})



function gameStart(player: Player[]) {
    // player[0].socket.write('')
    // player[1].socket.write('')

    let deck: Deck = new Deck();
    let game: Game = new Game(players, deck)
    
    game.play()
}