import {Component, Input, OnInit} from '@angular/core';
import {PlayerIdentifiers} from '../../../shared/enums/player-identifiers.enum';

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.scss']
})
export class PieceComponent implements OnInit {

  @Input()
  value: PlayerIdentifiers;
  PlayerIdentifiers = PlayerIdentifiers;

  constructor() { }

  ngOnInit() {
  }

}
