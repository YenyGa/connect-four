import {Component, OnInit} from '@angular/core';
import {Player} from '../../shared/models/player.model';
import {PlayerColors} from '../../shared/enums/player-colors.enum';
import {PlayerIdentifiers} from '../../shared/enums/player-identifiers.enum';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  boardMatrix: number[][];
  players: Player[];
  connectN = 4;

  constructor() { }

  ngOnInit() {
    this.initializeGame();
  }

  initializeGame() {
    this.boardMatrix = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0]
    ];

    this.players = [
      { name: 'Player 1', color: PlayerColors.red, identifier: PlayerIdentifiers.p1, active: true, winner: false},
      { name: 'Player 2', color: PlayerColors.blue, identifier: PlayerIdentifiers.p2, active: false, winner: false},
    ];
  }

  onClick(y: number) {
    const xPosition = this.getXPosition(y);
    if (xPosition !== undefined) {
      this.paintPiece(xPosition, y);
    }
  }

  getXPosition(y: number): number {
    let piecePosition: number;
    for (let x = this.boardMatrix.length - 1; x >= 0; x--) {
      if (this.boardMatrix[x][y] === 0) {
        piecePosition = x;
        x = -1;
      }
    }
    return piecePosition;
  }

  paintPiece(x: number, y: number) {
    const activePlayer = this.players.find(player => player.active);
    this.boardMatrix[x][y] = activePlayer.identifier;
    if (this.isAWinner(x, y)) {
      activePlayer.winner = true;
      this.showWinnerMessage();
    } else {
      this.setNextTurn();
    }
  }

  setNextTurn() {
    const activePlayerIndex = this.players.findIndex(player => player.active);
    this.players[activePlayerIndex].active  = false;
    if (activePlayerIndex + 1 < this.players.length) {
      this.players[activePlayerIndex + 1].active = true;
    } else {
      this.players[0].active = true;
    }
  }

  isAWinner(x: number, y: number): boolean {
    const activePlayer = this.players.find(player => player.active);
    return this.checkHorizontalRightWin(x, y, activePlayer) ||
      this.checkHorizontalLeftWin(x, y, activePlayer) ||
      this.checkVerticalWin(x, y, activePlayer) ||
      this.checkDiagonalRightBottomWin(x, y, activePlayer) ||
      this.checkDiagonalLeftBottomWin(x, y, activePlayer) ||
      this.checkDiagonalRightTopWin(x, y, activePlayer) ||
      this.checkDiagonalLeftTopWin(x, y, activePlayer);
  }

  checkHorizontalRightWin(x: number, y: number, activePlayer: Player): boolean {
    let connectCount = 1;
    for (let j = y + 1; j < y + this.connectN; j++) {
      if (this.boardMatrix[x][j] !== undefined && this.boardMatrix[x][j] === activePlayer.identifier) {
        connectCount++;
      } else {
        j = y + this.connectN;
      }
    }
    if (connectCount === this.connectN) {
      return true;
    }
    return false;
  }

  checkHorizontalLeftWin(x: number, y: number, activePlayer: Player): boolean {
    let connectCount = 1;
    for (let j = y - 1; j > y - this.connectN; j--) {
      if (this.boardMatrix[x][j] !== undefined && this.boardMatrix[x][j] === activePlayer.identifier) {
        connectCount++;
      } else {
        j = y - this.connectN;
      }
    }
    if (connectCount === this.connectN) {
      return true;
    }
    return false;
  }

  checkVerticalWin(x: number, y: number, activePlayer: Player): boolean {
    let connectCount = 1;
    for (let i = x + 1; i < x + this.connectN; i++) {
      if (this.boardMatrix[i] !== undefined && this.boardMatrix[i][y] === activePlayer.identifier) {
        connectCount++;
      } else {
        i = x + this.connectN;
      }
    }
    if (connectCount === this.connectN) {
      return true;
    }
    return false;
  }

  checkDiagonalRightBottomWin(x: number, y: number, activePlayer: Player): boolean {
    let connectCount = 1;
    let j = y + 1;
    for (let i = x + 1; i < x + this.connectN; i++) {
      if (this.boardMatrix[i] !== undefined &&
        this.boardMatrix[i][j] !== undefined &&
        this.boardMatrix[i][j] === activePlayer.identifier) {
        connectCount++;
        j = j + 1;
      } else {
        i = i + this.connectN;
      }
    }
    if (connectCount === this.connectN) {
      return true;
    }
    return false;
  }

  checkDiagonalLeftBottomWin(x: number, y: number, activePlayer: Player): boolean {
    let connectCount = 1;
    let j = y - 1;
    for (let i = x + 1; i < x + this.connectN; i++) {
      if (this.boardMatrix[i] !== undefined &&
        this.boardMatrix[i][j] !== undefined &&
        this.boardMatrix[i][j] === activePlayer.identifier) {
        connectCount++;
        j = j - 1;
      } else {
        i = i + this.connectN;
      }
    }
    if (connectCount === this.connectN) {
      return true;
    }
    return false;
  }

  checkDiagonalRightTopWin(x: number, y: number, activePlayer: Player): boolean {
    let connectCount = 1;
    let i = x - 1;
    for (let j = y + 1; j < y + this.connectN; j++) {
      if (this.boardMatrix[i] !== undefined &&
        this.boardMatrix[i][j] !== undefined &&
        this.boardMatrix[i][j] === activePlayer.identifier) {
        connectCount++;
        i = i - 1;
      } else {
        j = j + this.connectN;
      }
    }
    if (connectCount === this.connectN) {
      return true;
    }
    return false;
  }

  checkDiagonalLeftTopWin(x: number, y: number, activePlayer: Player): boolean {
    let connectCount = 1;
    let i = x - 1;
    for (let j = y - 1; j > y - this.connectN; j--) {
      if (this.boardMatrix[i] !== undefined &&
        this.boardMatrix[i][j] !== undefined &&
        this.boardMatrix[i][j] === activePlayer.identifier) {
        connectCount++;
        i = i - 1;
      } else {
        j = j - this.connectN;
      }
    }
    if (connectCount === this.connectN) {
      return true;
    }
    return false;
  }

  showWinnerMessage() {
    console.log('We have a winner!');
  }

  resetGame() {
    this.initializeGame();
  }

}
