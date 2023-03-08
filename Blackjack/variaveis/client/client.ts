import * as net from 'net'
import { Player } from '.././gameVariaveis/player';

const PORT = 3000, HOST = 'localhost'; 

export class Client {
    player: Player
    socket: net.Socket;
    address: any;
    port: any;

    constructor(name: string){
        this.player = new Player(name)
        this.socket = new net.Socket();
        this.address = HOST;
        this.port = PORT;
        this.init();
    }

    init() { 
        let client = this;
        client.socket.connect(client.port, client.address, () => { 
            console.log(`${this.player.name} conectado a: ${client.address} :  ${client.port}`); 
        });  
        client.socket.on('close', () => { 
            console.log(`${this.player.name} desconectado`); 
        }); 
    } 

    sendMessage(message){
        let client = this; 
        return new Promise((resolve, reject) => {
            client.socket.write(message);
            client.socket.on('data', (data) => {
                resolve(data);
                if(data.toString().endsWith('exit' || 'vou desconectar')){
                    client.socket.destroy();
                }
            });
            client.socket.on('error', (err) => {
                reject(err);
            });
        });
    }
}