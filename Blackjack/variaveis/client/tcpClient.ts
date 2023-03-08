import * as net from 'net';
import { Player } from '.././gameVariaveis/player';

const client: net.Socket = new net.Socket();

client.connect(3000, 'localhost', () => {
   console.log('Conectado ao servidor');
   client.write(`Olá, eu sou o ${Player.name}`);
});

client.on('data', (data: Buffer) => {
   console.log(`Cliente recebido: ${data.toString()}`);
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