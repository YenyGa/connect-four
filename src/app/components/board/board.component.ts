import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  boardMatrix: number[][];
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
  }

  onClick(x: number, y: number) {
    const xPosition = this.getXPosition(y);
    this.boardMatrix[xPosition][y] = 1;

    console.log(this.boardMatrix);
  }

  getXPosition(y: number): number {
    let piecePosition = 0;

    for (let x = this.boardMatrix.length - 1; x > 0; x--) {
      if (this.boardMatrix[x][y] === 0) {
        piecePosition = x;
        x = 0;
      }
    }

    return piecePosition;
  }

}
