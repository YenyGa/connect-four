import {Component, Input, OnInit} from '@angular/core';
import {PlayerIdentifiers} from '../../../shared/enums/player-identifiers.enum';
import {Player} from '../../../shared/models/player.model';

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.scss']
})
export class PieceComponent implements OnInit {

  @Input()
  item: PlayerIdentifiers;

  @Input()
  activePlayer: Player;

  PlayerIdentifiers = PlayerIdentifiers;
  redHighLighted: boolean;
  blueHighLighted: boolean;

  constructor() { }

  ngOnInit() {
    this.redHighLighted = false;
    this.blueHighLighted = false;
  }

  mouseEnter() {
    if (this.activePlayer.identifier === PlayerIdentifiers.p1) {
      this.redHighLighted = true;
    } else {
      this.blueHighLighted = true;
    }
  }

  mouseLeave() {
    this.blueHighLighted = false;
    this.redHighLighted = false;
  }

}
