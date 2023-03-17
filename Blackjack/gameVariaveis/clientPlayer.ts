import * as net from 'net';
import { Player } from './player';

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

   console.log(message)

    if(action == 'Login') {
        process.stdin.once('data', (input) => {
            const name = input.toString().trim();
            client.write(`Login ${name}`);
        });
    }
    

    if(action == 'Aguarde') {
        console.log(message)
    }

    if(action == 'ShowHand') {
        console.log(params.join(' '))
        const choice = readline.question('Do you want to hit or stand? (h/s): ')

        client.write(choice)
    }

    if (action == 'DealerHand') {
        console.log(params.join(' '))
    }

    if(action == 'Você') {
        console.log(params.join(' '))
    }

    if(action == 'stand') {
        // console.log(params.join(' '))
        console.log(message)
    }
    

   if(data.toString().endsWith('exit') || data.toString().endsWith('vou desconectar')) {
    client.destroy()
   }

    // if(data.toString().endsWith('exit') || data.toString().endsWith('vou desconectar')) {
    //     client.destroy()
    // }
});

client.on('end', () => {
   console.log(`Cliente ${Player.name} desconectado do servidor`);
});

client.on('error', (err) => { 
    console.error(err); 
});