import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameService } from '../game.service';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-metamask',
  templateUrl: './metamask.component.html',
  styleUrls: ['./metamask.component.css', '../header/header.component.css']
})
export class MetamaskComponent implements OnInit, OnDestroy {

  private _onDestroy = new Subject();

  constructor(public game: GameService, private router: Router) { }

  ngOnInit() {
  	Observable.interval(2000).takeUntil(this._onDestroy).subscribe(x => {
      	this.game.getAccount().then(res => { 
      		if (res != 'undefined'){
      			this.game.MetaMaskError = 0; 
      		} 
      	});
  		
    });
  }

  ngOnDestroy() {
    this._onDestroy.next();
  }

}
