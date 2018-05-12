import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameService } from '../game.service';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{

  constructor(private game: GameService, public router: Router) {}

  isNavbarCollapsed = true;
  private _onDestroy = new Subject();

  ngOnInit() { 
    Observable.timer(0, 2000).takeUntil(this._onDestroy).subscribe(x => {
      this.checkMessage();
    });

    //check for account changes
    Observable.timer(3000,2000).takeUntil(this._onDestroy).subscribe(x =>{
      this.game.checkIfAccountWasChanged();
    });
  }

  ///@notice Checks if player has called some action
  checkMessage(){
    if(this.game.web3message.called){
      if (this.game.web3message.error) {
        this.game.nullWeb3Message();
      }else{
        this.router.navigate(['/transaction-sent']);
      }
      this.game.web3message.called = false;
    }
  }

  ngOnDestroy() {
    this._onDestroy.next();
  }

}
