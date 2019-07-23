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
  draw: boolean;
  connectN: number;
  connectNOptions: number[];
  piecesDroped: number;
  boardHeight: number;
  boardWidth: number;
  gridSize: any;
  disableUndoButton: boolean;
  boardBlocked: boolean;

  PlayerIdentifiers = PlayerIdentifiers;

  constructor() { }

  ngOnInit() {
    this.connectN = 4;
    this.connectNOptions = [4, 5, 6, 7, 8, 9, 10];

    this.initializeGame();
  }

  initializeGame() {
    this.boardBlocked = false;
    this.boardWidth = 2 * this.connectN - 1;
    this.boardHeight = this.connectN + 2;
    this.boardMatrix = [];
    this.piecesDroped = 0;
    this.draw = false;
    this.fillBoardMatrix();
    this.gridSize = {
      'grid-template-columns': `repeat(${this.boardWidth}, 3rem)`,
      'grid-template-rows': `repeat(${this.boardHeight}, 3rem)`
    };

    this.disableUndoButton = false;

    this.players = [
      { name: 'Player 1', identifier: PlayerIdentifiers.p1, active: true},
      { name: 'Player 2', identifier: PlayerIdentifiers.p2, active: false},
    ];

    this.activePlayer = this.players[0];
    this.winner = undefined;
  }

  fillBoardMatrix() {
    for (let i = 0; i < this.boardWidth; i++) {
      const column = [];
      for (let j = 0; j < this.boardHeight; j++) {
        column.push(0);
      }
      this.boardMatrix.push(column);
    }
  }

  onClick(x: number) {
    if (!this.boardBlocked) {
      const yFall = this.getYPosition(x);
      if (yFall !== undefined) {
        this.disableUndoButton = false;
        const startPosition: Coordinate = {x, y: 0};
        const endPosition: Coordinate = {x, y: yFall};
        this.boardBlocked = true;
        this.animateFall(startPosition, endPosition);
        this.lastTurnCoordinates = endPosition;
        this.piecesDroped = this.piecesDroped + 1;
        this.draw = this.checkDraw();
      }
    }
  }

  getYPosition(x: number): number {
    let piecePosition: number;
    for (let y = this.boardMatrix[x].length - 1; y >= 0; y--) {
      if (this.boardMatrix[x][y] === 0) {
        piecePosition = y;
        y = -1;
      }
    }
    return piecePosition;
  }

  animateFall(startPosition: Coordinate, endPosition: Coordinate) {
    setTimeout(() => {
      if (startPosition.y <= endPosition.y) {
        this.boardMatrix[startPosition.x][startPosition.y] = this.activePlayer.identifier;
        if (this.boardMatrix[startPosition.x][startPosition.y - 1] !== undefined) {
          this.boardMatrix[startPosition.x][startPosition.y - 1] = 0;
        }
        startPosition.y = startPosition.y + 1;
        this.animateFall(startPosition, endPosition);
      } else {
        this.boardBlocked = false;
        if (this.isAWinner(endPosition.x, endPosition.y)) {
          this.winner = this.activePlayer;
        } else {
          this.setNextTurn();
        }
      }
    }, 50);
  }

  isAWinner(x: number, y: number): boolean {
    if (this.verticalConnections(x, y) + 1 >= this.connectN ||
      this.leftConnections(x, y) + 1 + this.rightConnections(x, y) >= this.connectN ||
      this.rightBottomConnections(x, y) + 1 + this.leftTopConnections(x, y) >= this.connectN ||
      this.rightTopConnections(x, y) + 1 + this.leftBottomConnections(x, y) >= this.connectN) {
      return true;
    }
    return false;
  }

  verticalConnections(x: number, y: number): number {
    let connectCount = 0;
    for (let j = y + 1; j < y + this.connectN; j++) {
      if (this.boardMatrix[x][j] !== undefined && this.boardMatrix[x][j] === this.activePlayer.identifier) {
        connectCount++;
      } else {
        j = y + this.connectN;
      }
    }
    return connectCount;
  }

  leftConnections(x: number, y: number): number {
    let connectCount = 0;
    for (let i = x - 1; i > x - this.connectN; i--) {
      if (this.boardMatrix[i] !== undefined && this.boardMatrix[i][y] === this.activePlayer.identifier) {
        connectCount++;
      } else {
        i = x - this.connectN;
      }
    }
    return connectCount;
  }

  rightConnections(x: number, y: number): number {
    let connectCount = 0;
    for (let i = x + 1; i < x + this.connectN; i++) {
      if (this.boardMatrix[i] !== undefined && this.boardMatrix[i][y] === this.activePlayer.identifier) {
        connectCount++;
      } else {
        i = x + this.connectN;
      }
    }
    return connectCount;
  }

  rightBottomConnections(x: number, y: number): number {
    let connectCount = 0;
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
    return connectCount;
  }

  rightTopConnections(x: number, y: number): number {
    let connectCount = 0;
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
    return connectCount;
  }

  leftBottomConnections(x: number, y: number): number {
    let connectCount = 0;
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
    return connectCount;
  }

  leftTopConnections(x: number, y: number): number {
    let connectCount = 0;
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
    return connectCount;
  }

  checkDraw(): boolean {
    if (this.piecesDroped === (5 * this.connectN + 1) * 2) {
      return true;
    }
    return false;
  }

  resetGame() {
    this.initializeGame();
  }

  undoTurn() {
    this.disableUndoButton = true;
    this.boardMatrix[this.lastTurnCoordinates.x][this.lastTurnCoordinates.y] = 0;
    this.piecesDroped = this.piecesDroped - 1;
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

  setConnectN(connectN: number) {
    if (connectN !== this.connectN) {
      this.connectN = connectN;
      this.initializeGame();
    }
  }

}
