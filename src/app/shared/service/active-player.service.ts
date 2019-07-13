import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {Player} from '../models/player.model';

@Injectable()
export class ActivePlayerService {

  public $player = new Subject<Player>();

  constructor() { }

}
