import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {PlayerIdentifiers} from '../../../shared/enums/player-identifiers.enum';
import {Player} from '../../../shared/models/player.model';
import {ActivePlayerService} from '../../../shared/service/active-player.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.scss']
})
export class PieceComponent implements OnInit, OnDestroy {

  @Input()
  item: PlayerIdentifiers;

  @Input()
  activePlayer: Player;

  activePlayerSubscription: Subscription;

  PlayerIdentifiers = PlayerIdentifiers;
  p1HighLighted: boolean;
  p2HighLighted: boolean;

  constructor(private activePlayerService: ActivePlayerService) { }

  ngOnInit() {
    this.clearHighlight();
    this.activePlayerSubscription = this.activePlayerService.$player.subscribe(activePlayer => {
      this.activePlayer = activePlayer;
      // this.setHighLightColor();
      console.log(activePlayer);
    });
  }

  clearHighlight() {
    this.p1HighLighted = false;
    this.p2HighLighted = false;
  }

  mouseEnter() {
    this.setHighLightColor();
  }

  setHighLightColor() {
    if (this.item === 0) {
      if (this.activePlayer.identifier === PlayerIdentifiers.p1) {
        this.p1HighLighted = true;
      } else {
        this.p2HighLighted = true;
      }
    }
  }

  changePieceColor() {
    this.clearHighlight();
  }

  mouseLeave() {
    this.clearHighlight();
  }

  ngOnDestroy(): void {
    if (this.activePlayerSubscription) {
      this.activePlayerSubscription.unsubscribe();
    }
  }

}
