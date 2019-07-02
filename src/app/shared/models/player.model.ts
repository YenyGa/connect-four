import {PlayerColors} from '../enums/player-colors.enum';
import {PlayerIdentifiers} from '../enums/player-identifiers.enum';

export class Player {
  name: string;
  color: PlayerColors;
  identifier: PlayerIdentifiers;
  active: boolean;
  winner: boolean;
}
