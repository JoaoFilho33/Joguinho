import { write } from "fs";
import { Dealer } from "./dealer";
import { Game } from "./game";
import { Player } from "./player";

const readline = require('readline-sync')

let player: Player
let players: Player[] = [];
let dealer: Dealer
let currentPlayer = 0;
let currentDeck: number[] = [];
let isGameStarted = false;
let game: Game

// export function checkEndTurn(): boolean {
//     if (player.handValue > 21) {
//       // player.isTurn = false;
//       return false
//     }

//       return player.isTurn
//   }

  // function user_wish_continue(): string{
  //   let choice = readline.question(`${player.name}, do you want to hit or stand? (h/s)`);
  //   return choice.toLowerCase()
  // }