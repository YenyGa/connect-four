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
  N = 4;

  constructor() { }

  ngOnInit() {
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

  onClick(x: number, y: number) {
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
    this.setNextTurn();
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

}
