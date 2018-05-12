import { Component, OnDestroy  } from '@angular/core';
import { GameService } from '../game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnDestroy {

  errorIsCollapsed = true;

  constructor(public game: GameService, private router: Router) {
  	//check if message already was not deleted
  	if(!this.game.web3message.result && !this.game.web3message.error){
  		this.router.navigate(['/portfolio']);
  	}
  }

  ngOnDestroy() {
  	//on exit destroy message
    this.game.nullWeb3Message();
  }

}
