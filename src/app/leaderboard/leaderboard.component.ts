import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameService } from '../game.service';
import { ActivatedRoute } from '@angular/router'; 
import { OrderPipe } from 'ngx-order-pipe';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit, OnDestroy {

  myChamps:any;
  showingChamp:number = 3;
  champsLength:number = 10;

  //places
  firstChamp:any;
  secondChamp:any;
  thirdChamp:any;

  //loading
  loadingCompleted:any = {'firstPlace': false, 'secondPlace': false, 'thirdPlace': false, 'fourthPlace': false, 'fifthPlace': false};
  loading:boolean = true;
  
  champs:any = [5];

  private _onDestroy = new Subject();

  constructor(public game: GameService, private route: ActivatedRoute, private orderPipe: OrderPipe) { 
    this.game.myChamps.takeUntil(this._onDestroy).subscribe(res => this.myChamps = res);
  }

  ngOnInit() {  
    //keep updated
    Observable.timer(0,8000).takeUntil(this._onDestroy).subscribe(x => {
      this.game.reloadMyChamps();
    });

    //update leaderboard position
    this.updatePositions();  
  }

  ///@dev Updates firstChamp, secondChamp & thirdChamp
  updatePositions(){
    this.loading = true;
    this.loadingCompleted.firstPlace = false;
    this.loadingCompleted.secondPlace = false;
    this.loadingCompleted.thirdPlace = false;
    this.loadingCompleted.fourthPlace = false;
    this.loadingCompleted.fifthPlace = false;
    this.champs = [];

    this.game.getTotalChampsCount().then(res => { 
      this.champsLength = res;  
    });

  	//first place
  	let firstPlace = this.showingChamp - 2;
  	if(firstPlace > 0 && firstPlace <= this.champsLength){
  		this.game.getChampAtPosition(firstPlace).then(res => { 
  			let champID = res;
  			this.game.getChamp(champID).then(champ => { 
  			    this.champs[0] = champ;
            this.loadingCompleted.firstPlace = true;
            this.checkIfLoadingCompleted();
  			});  
  		});
  	}else{
  		this.firstChamp = undefined;
      this.loadingCompleted.firstPlace = true;
      this.checkIfLoadingCompleted();
  	}

  	//second place
  	let secondPlace = this.showingChamp - 1;
  	if(secondPlace > 0 && secondPlace <= this.champsLength){
  		this.game.getChampAtPosition( secondPlace ).then(res => { 
  			let champID = res;
  			this.game.getChamp(champID).then(champ => { 
  			    this.champs[1] = champ;
            this.loadingCompleted.secondPlace = true;
            this.checkIfLoadingCompleted();
  			});  
  		});
  	}else{
  		this.secondChamp = undefined;
      this.loadingCompleted.secondPlace = true;
      this.checkIfLoadingCompleted();
  	}


  	//third place
  	let thirdPlace = this.showingChamp;
  	if(thirdPlace > 0 && thirdPlace <= this.champsLength){
  		this.game.getChampAtPosition( thirdPlace ).then(res => { 
  			let champID = res;
  			this.game.getChamp(champID).then(champ => { 
  			    this.champs[2] = champ;
            this.loadingCompleted.thirdPlace = true;
            this.checkIfLoadingCompleted();
  			});  
  		});
  	}else{
  		this.thirdChamp = undefined;
      this.loadingCompleted.thirdPlace = true;
      this.checkIfLoadingCompleted();
  	}

    //fourth place
    let fourthPlace = this.showingChamp + 1;
    if(fourthPlace > 0 && fourthPlace <= this.champsLength){
      this.game.getChampAtPosition( fourthPlace ).then(res => { 
        let champID = res;
        this.game.getChamp(champID).then(champ => { 
            this.champs[3] = champ;
            this.loadingCompleted.fourthPlace = true;
            this.checkIfLoadingCompleted();
        });  
      });
    }else{
      this.thirdChamp = undefined;
      this.loadingCompleted.fourthPlace = true;
      this.checkIfLoadingCompleted();
    }


    //fifth place
    let fifthPlace = this.showingChamp + 2;
    if(fifthPlace > 0 && fifthPlace <= this.champsLength){
      this.game.getChampAtPosition( fifthPlace ).then(res => { 
        let champID = res;
        this.game.getChamp(champID).then(champ => { 
            this.champs[4] = champ;
            this.loadingCompleted.fifthPlace = true;
            this.checkIfLoadingCompleted();
        });  
      });
    }else{
      this.thirdChamp = undefined;
      this.loadingCompleted.fifthPlace = true;
      this.checkIfLoadingCompleted();
    }

  }


  ///@notice Next champ
  showingChampPlus(){
    let oldShowingChamp = this.showingChamp;
  	this.showingChamp = (this.showingChamp+5 >= this.champsLength - 1) ? this.champsLength - 2 : this.showingChamp+5;
    if(oldShowingChamp != this.showingChamp){
  	  this.updatePositions();
    }
  }


  ///@notice Prev champ
  showingChampMinus(){
    let oldShowingChamp = this.showingChamp;
  	this.showingChamp = (this.showingChamp-5 <= 2) ? 3 : this.showingChamp-5;
  	if(oldShowingChamp != this.showingChamp){
      this.updatePositions();
    }
  }

  ///@notice Jump to place
  goTo(_place:number){
    if(this.showingChamp != _place){
    	if(_place < 3){
    		_place = 3;
    	}else if(_place > this.champsLength - 2){
    		_place = this.champsLength - 2;
    	}
    	this.showingChamp = _place;
    	this.updatePositions();
    }
  }

  ///@dev If firstPlace, secondPlace & thirdPlace have fineshed loading than loading is complete
  checkIfLoadingCompleted(){
    if(this.loadingCompleted.firstPlace && this.loadingCompleted.secondPlace && this.loadingCompleted.thirdPlace && this.loadingCompleted.fourthPlace && this.loadingCompleted.fifthPlace){
      this.loading = false;
    }
  }

  ngOnDestroy() {
    this._onDestroy.next();
  }

}
