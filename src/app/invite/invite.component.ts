import { Component } from '@angular/core';
import { GameService } from '../game.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent {

  link:string = "https://mycryptochamp.io/invitation/";

  constructor(public game: GameService) { }

}
