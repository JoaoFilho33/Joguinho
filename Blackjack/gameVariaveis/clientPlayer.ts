import * as net from 'net';
import { Player } from '../../Joguinho-20230317T004153Z-001/Joguinho/Blackjack/variaveis/gameVariaveis/player';

const readline = require('readline-sync')

const client: net.Socket = new net.Socket();

client.connect(3000, 'localhost', () => {
   console.log('Conectado ao servidor');
   const name = readline.question('Digite seu nome: ')

   client.write(`Login ${name}`);
});

client.on('data', (data: Buffer) => {
   const message = data.toString().trim()

   let [action, ...params] = message.split(' ')


    if(action == 'Jogada') {
        console.log(params.join(" "))

        const choice = readline.question()

        client.write(choice)
    }

    if(action == 'Aguarde') {
        console.log(message)
    }

    if(action == 'ShowHand') {
        console.log(params.join(' '))
    }


   if(data.toString().endsWith('exit' || 'vou desconectar')) {
    client.destroy()
   }
});

client.on('end', () => {
   console.log(`Cliente ${Player.name} desconectado do servidor`);
});

client.on('error', (err) => { 
    console.error(err); 
});