import * as net from 'net';

class Player {
  public id: number;
  public name: string;
  public cards: number[];
  public score: number;
  public isTurn: boolean;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.cards = [];
    this.score = 0;
    this.isTurn = false;
  }

  public getCard(card: number): void {
    this.cards.push(card);
    this.score = this.calculateScore();
  }

  public calculateScore(): number {
    let score = 0;
    let aceCount = 0;
    for (const card of this.cards) {
      if (card === 1) {
        aceCount++;
        score += 11;
      } else if (card > 1 && card <= 10) {
        score += card;
      } else {
        score += 10;
      }
    }
    while (aceCount > 0 && score > 21) {
      score -= 10;
      aceCount--;
    }
    return score;
  }

  public reset(): void {
    this.cards = [];
    this.score = 0;
    this.isTurn = false;
  }
}

const server = net.createServer();

let players: Player[] = [];
let currentPlayerIndex = 0;
let currentDeck: number[] = [];
let isGameStarted = false;

function initDeck(): void {
  currentDeck = [];
  for (let i = 1; i <= 13; i++) {
    for (let j = 0; j < 4; j++) {
      currentDeck.push(i);
    }
  }
}

function shuffleDeck(): void {
  for (let i = currentDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [currentDeck[i], currentDeck[j]] = [currentDeck[j], currentDeck[i]];
  }
}

function dealCards(): void {
  for (let i = 0; i < players.length; i++) {
    players[i].getCard(currentDeck.pop());
  }
  for (let i = 0; i < players.length; i++) {
    players[i].getCard(currentDeck.pop());
  }
}

function hit(player: Player): void {
  player.getCard(currentDeck.pop());
  checkEndTurn();
}

function dealerTurn(): void {
  let dealerScore = players[0].score;
  while (dealerScore < 17) {
    players[0].getCard(currentDeck.pop());
    dealerScore = players[0].score;
  }
}

function determineWinner(): number {
  let winner = -1;
  let maxScore = 0;
  for (let i = 0; i < players.length; i++) {
    if (players[i].score > maxScore && players[i].score <= 21) {
      maxScore = players[i].score;
      winner = i;
    }
  }
  return winner;
}

function checkEndTurn(): void {
    let allPlayersDone = true;
    for (const player of players) {
      if (!player.isTurn) {
        continue;
      }
      
      if (player.score > 21) {
        player.isTurn = false;
        currentPlayerIndex++;
        
        if (currentPlayerIndex >= players.length) {
          dealerTurn();

          const winnerIndex = determineWinner();
          if (winnerIndex === -1) {
            broadcast('Empate!');
          } else {
            broadcast(`Jogador ${players[winnerIndex].name} ganhou!`);
          }
          isGameStarted = false;
          players = [];
          return;
        }
        continue;
      }
      allPlayersDone = false;
      break;
    }
    if (allPlayersDone) {
      currentPlayerIndex++;
      if (currentPlayerIndex >= players.length) {
        dealerTurn();
        const winnerIndex = determineWinner();
        if (winnerIndex === -1) {
          broadcast('Empate!');
        } else {
          broadcast(`Jogador ${players[winnerIndex].name} ganhou!`);
        }
        isGameStarted = false;
        players = [];
        return;
      }
    }
    players[currentPlayerIndex].isTurn = true;
    sendToPlayer(currentPlayerIndex, `Sua vez! (${players[currentPlayerIndex].score})`);
    broadcast(`Vez do jogador ${players[currentPlayerIndex].name} (${players[currentPlayerIndex].score})`);
  }
  
