import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { PieceComponent } from './components/board/piece/piece.component';
import {ActivePlayerService} from './shared/service/active-player.service';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    PieceComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ActivePlayerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
