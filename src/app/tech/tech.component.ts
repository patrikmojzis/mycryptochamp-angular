import { Component } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-tech',
  templateUrl: './tech.component.html',
  styleUrls: ['./tech.component.css']
})
export class TechComponent {

  myChampsCount: number;
  myItemsCount: number;
  abiHidden: boolean = true;

  constructor(public game: GameService) { }


}
