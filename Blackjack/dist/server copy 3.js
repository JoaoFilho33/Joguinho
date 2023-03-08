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
const net = __importStar(require("net"));
let sockets = [];
const server = net.createServer((socket) => {
    var clientAddress = `${socket.remoteAddress}: ${socket.remotePort}`;
    console.log(`Cliente conectado: ${clientAddress}`);
    sockets.push(socket);
    socket.write('Olá, cliente!\n');
    socket.on('data', (data) => {
        console.log(`${clientAddress}: ${data.toString()}`);
        sockets.forEach((sock) => {
            sock.write(`${sock.remoteAddress}: ${sock.remotePort} disse ${data}\n`);
        });
    });
    socket.on('close', (data) => {
        const index = sockets.findIndex((index) => {
            return (index.remoteAddress === socket.remoteAddress) && (index.remotePort === socket.remotePort);
        });
        if (index !== -1)
            sockets.splice(index, 1);
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
    console.log('Servidor inicializando na porta 3000');
});
