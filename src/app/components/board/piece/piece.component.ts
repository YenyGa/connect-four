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
  p1HighLighted: boolean;
  p2HighLighted: boolean;

  constructor() { }

  ngOnInit() {
    this.p1HighLighted = false;
    this.p2HighLighted = false;
  }

  mouseEnter() {
    if (this.activePlayer.identifier === PlayerIdentifiers.p1) {
      this.p1HighLighted = true;
    } else {
      this.p2HighLighted = true;
    }
  }

  mouseLeave() {
    this.p2HighLighted = false;
    this.p1HighLighted = false;
  }

}
