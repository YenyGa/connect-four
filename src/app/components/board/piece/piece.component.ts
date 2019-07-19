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

  constructor() { }

  ngOnInit() {
  }

}
