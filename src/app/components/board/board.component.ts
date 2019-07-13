import {Component, OnInit} from '@angular/core';
import {Player} from '../../shared/models/player.model';
import {PlayerIdentifiers} from '../../shared/enums/player-identifiers.enum';
import {Coordinate} from '../../shared/models/coordenate.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  boardMatrix: number[][];
  players: Player[];
  lastTurnCoordinates: Coordinate;
  activePlayer: Player;
  winner: Player;
  connectN = 4;

  PlayerIdentifiers = PlayerIdentifiers;

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
      { name: 'Player 1', identifier: PlayerIdentifiers.p1, active: true},
      { name: 'Player 2', identifier: PlayerIdentifiers.p2, active: false},
    ];

    this.activePlayer = this.players[0];
    this.winner = undefined;
  }

  onClick(y: number) {
    const xFall = this.getXPosition(y);
    if (xFall !== undefined) {
      const startPosition: Coordinate = {x: 0, y};
      const endPosition: Coordinate = {x: xFall, y};
      this.animateFall(startPosition, endPosition);
      this.lastTurnCoordinates = endPosition;
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

  animateFall(startPosition: Coordinate, endPosition: Coordinate) {
    setTimeout(() => {
      if (startPosition.x <= endPosition.x) {
        this.boardMatrix[startPosition.x][startPosition.y] = this.activePlayer.identifier;
        if (this.boardMatrix[startPosition.x - 1] !== undefined) {
          this.boardMatrix[startPosition.x - 1][startPosition.y] = 0;
        }
        startPosition.x = startPosition.x + 1;
        this.animateFall(startPosition, endPosition);
      } else {
        if (this.isAWinner(endPosition.x, endPosition.y)) {
          this.winner = this.activePlayer;
        } else {
          this.setNextTurn();
        }
      }
    }, 50);
  }

  isAWinner(x: number, y: number): boolean {
    return this.checkHorizontalRightWin(x, y) ||
      this.checkHorizontalLeftWin(x, y) ||
      this.checkVerticalWin(x, y) ||
      this.checkDiagonalRightBottomWin(x, y) ||
      this.checkDiagonalLeftBottomWin(x, y) ||
      this.checkDiagonalRightTopWin(x, y) ||
      this.checkDiagonalLeftTopWin(x, y);
  }

  checkHorizontalRightWin(x: number, y: number): boolean {
    let connectCount = 1;
    for (let j = y + 1; j < y + this.connectN; j++) {
      if (this.boardMatrix[x][j] !== undefined && this.boardMatrix[x][j] === this.activePlayer.identifier) {
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

  checkHorizontalLeftWin(x: number, y: number): boolean {
    let connectCount = 1;
    for (let j = y - 1; j > y - this.connectN; j--) {
      if (this.boardMatrix[x][j] !== undefined && this.boardMatrix[x][j] === this.activePlayer.identifier) {
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

  checkVerticalWin(x: number, y: number): boolean {
    let connectCount = 1;
    for (let i = x + 1; i < x + this.connectN; i++) {
      if (this.boardMatrix[i] !== undefined && this.boardMatrix[i][y] === this.activePlayer.identifier) {
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

  checkDiagonalRightBottomWin(x: number, y: number): boolean {
    let connectCount = 1;
    let j = y + 1;
    for (let i = x + 1; i < x + this.connectN; i++) {
      if (this.boardMatrix[i] !== undefined &&
        this.boardMatrix[i][j] !== undefined &&
        this.boardMatrix[i][j] === this.activePlayer.identifier) {
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

  checkDiagonalLeftBottomWin(x: number, y: number): boolean {
    let connectCount = 1;
    let j = y - 1;
    for (let i = x + 1; i < x + this.connectN; i++) {
      if (this.boardMatrix[i] !== undefined &&
        this.boardMatrix[i][j] !== undefined &&
        this.boardMatrix[i][j] === this.activePlayer.identifier) {
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

  checkDiagonalRightTopWin(x: number, y: number): boolean {
    let connectCount = 1;
    let i = x - 1;
    for (let j = y + 1; j < y + this.connectN; j++) {
      if (this.boardMatrix[i] !== undefined &&
        this.boardMatrix[i][j] !== undefined &&
        this.boardMatrix[i][j] === this.activePlayer.identifier) {
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

  checkDiagonalLeftTopWin(x: number, y: number): boolean {
    let connectCount = 1;
    let i = x - 1;
    for (let j = y - 1; j > y - this.connectN; j--) {
      if (this.boardMatrix[i] !== undefined &&
        this.boardMatrix[i][j] !== undefined &&
        this.boardMatrix[i][j] === this.activePlayer.identifier) {
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

  resetGame() {
    this.initializeGame();
  }

  undoTurn() {
    this.boardMatrix[this.lastTurnCoordinates.x][this.lastTurnCoordinates.y] = 0;
    this.setPreviousTurn();
  }

  setNextTurn() {
    const activePlayerIndex = this.players.findIndex(player => player.active);
    this.players[activePlayerIndex].active  = false;
    if (activePlayerIndex + 1 < this.players.length) {
      this.players[activePlayerIndex + 1].active = true;
    } else {
      this.players[0].active = true;
    }
    this.updateActivePlayer();
  }

  setPreviousTurn() {
    const activePlayerIndex = this.players.findIndex(player => player.active);
    this.players[activePlayerIndex].active  = false;
    if (activePlayerIndex - 1 >= 0) {
      this.players[activePlayerIndex - 1].active = true;
    } else {
      this.players[this.players.length - 1].active = true;
    }
    this.updateActivePlayer();
  }

  updateActivePlayer() {
    this.activePlayer = this.players.find(player => player.active);
  }

}
