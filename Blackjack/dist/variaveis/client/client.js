"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const net = __importStar(require("net"));
const player_1 = require(".././gameVariaveis/player");
const PORT = 3000, HOST = 'localhost';
class Client {
    constructor(name) {
        this.player = new player_1.Player(name);
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
    sendMessage(message) {
        let client = this;
        return new Promise((resolve, reject) => {
            client.socket.write(message);
            client.socket.on('data', (data) => {
                resolve(data);
                if (data.toString().endsWith('exit' || 'vou desconectar')) {
                    client.socket.destroy();
                }
            });
            client.socket.on('error', (err) => {
                reject(err);
            });
        });
    }
}
exports.Client = Client;
