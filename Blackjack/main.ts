import * as net from 'net'
import { Deck } from './gameVariaveis/deck';
import { Game } from './gameVariaveis/game';
import { Player } from './gameVariaveis/player';
import * as fs from 'fs'

const readline = require('readline-sync')

let sockets = []
let players = []
let deck: Deck = new Deck();
let game: Game = new Game(players, deck)

function disconnectUser(socket: net.Socket) {
    const index = sockets.indexOf(`${socket.remoteAddress}:${socket.remotePort}`)
    sockets.splice(index, 1)
    players.splice(index, 1)
 }


 const server: net.Server = net.createServer((socket: net.Socket) => {

    console.log('Client connected:', socket.remoteAddress, socket.remotePort);

    //let clientAddress = `${socket.remoteAddress}:${socket.remotePort}`; 
    //console.log(`Novo player conectado: ${clientAddress}/n`);
    //sockets.push(socket)
    //socket.write(`Olá, ${Player.name}!`);

    socket.on('data', async (data: Buffer)=>{
        const message = data.toString().trim()
        let [action, ...params] = message.split(' ')

        let player: Player | null = null

        if(action == 'Login'){
            player = new Player(params[0], socket)
            players.push(player)
            sockets.push(`${socket.remoteAddress}:${socket.remotePort}`)
        }
    
        if(players) {
            if(players.length == 2){
                await gameStart(players)

            }else{
                socket.write('Aguarde o segundo Player')
            }
        }

        // if(player[0].handValue )
    });

    socket.on('close', (data) => {
        console.log('Client disconnected:', socket.remoteAddress, socket.remotePort);
        disconnectUser(socket)
    });

    // socket.on('error', (err) => { 
    //     console.log(`Ocorreu um erro em ${clientAddress}: ${err.message}`); 
    // });
});

async function gameStart(players: Player[]) {
    let deck: Deck = new Deck();
    let game: Game = new Game(players, deck);
  
    await game.play();
    
    // Obtém o vencedor da partida

    const winner = game.winner_index();
    let result = "";
    if (winner >= 0 && winner <= 1) {
      result = `${new Date().toISOString()} - ${players[winner].name} ganhou a partida\n`;
    } 
    else if (winner > 1) {
        result = `${new Date().toISOString()} - Dealer venceu a partida\n`;
    }
    else {
      result = `${new Date().toISOString()} - Ninguém ganhou a partida\n`;
    }
  
    // Escreve o resultado da partida no histórico
    fs.appendFile('history.txt', result, (err) => {
      if (err) throw err;
      console.log('Resultado da partida escrito no histórico');
    });
}

function getHistory(socket: net.Socket) {
    fs.readFile('history.txt', (err, data) => {
      if (err) throw err;
      socket.write(data.toString());
    });
}

    server.listen(3000, () => {
        console.log('Servidor inicializado na porta 3000')
    })
