import { Component } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent{

  myChampsCount: number;
  myItemsCount: number;

  constructor(public game: GameService) { }

}
