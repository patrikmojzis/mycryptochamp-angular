import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameService } from '../game.service';
import { ActivatedRoute } from '@angular/router';  
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-champ',
  templateUrl: './champ.component.html',
  styleUrls: ['./champ.component.css']
})
export class ChampComponent implements OnInit, OnDestroy {

  id:number;
  champ:any;
  isOwner:boolean = false;
  blockTimestamp:number;
  myChamps:any = [];
  myAddress:string;

  champReward:number;

  itemSword:any;
  itemShield:any;
  itemHelmet:any;

  //if player wants sell champ
  sellingPrice:number = 0.01;
  //new name
  newName:string;
  //if player wants give champ
  giftRecieverAddress:string = "0x";

  //loading
  loading:boolean = true;
  loadingCompleted:any = {'isOwnerOfChamp': false, 'eq_sword': false, 'eq_shield': false, 'eq_helmet': false, 'champ': false};

  affiliateAddress:string;

  private _onDestroy = new Subject();

  constructor(public game: GameService, private route: ActivatedRoute, private modalService: NgbModal, private cookieService: CookieService) { 
    this.route.params.takeUntil(this._onDestroy).subscribe(res => { 
  		this.id = res.id;
  	});
    this.game.blockTimestamp.takeUntil(this._onDestroy).subscribe(res => this.blockTimestamp = res);
    this.game.myChamps.takeUntil(this._onDestroy).subscribe(res => this.myChamps = res);
  }

  ///@dev starts after delay few ms to let subscribe time
  ngOnInit() {
    Observable.timer(100,2000).takeUntil(this._onDestroy).subscribe(x => {
      if(this.id){
        this.getChampInfo();
        this.game.reloadBlockTimestamp();
        this.game.reloadMyChamps();
      }
    });

    this.game.getAccount().then(res => this.myAddress = res);

    //get affiliate address
    this.affiliateAddress = (this.cookieService.get('affiliateAddress') != '') ? this.cookieService.get('affiliateAddress') : null; 
  }

  ///@notice Gets champ's info
  ///@dev Also sets loading state
  getChampInfo(){
  	this.game.getChamp(this.id).then(champ => { 
  		this.champ = champ;

      this.game.getChampReward(champ.position).then(res=>this.champReward = res / 1000000000000000000);

      this.loadingCompleted.champ = true;
  		this.game.isOwnerOfChamp(champ.id,null).then(res => {this.isOwner = res; this.loadingCompleted.isOwnerOfChamp = true; this.checkIfLoadingCompleted();});
      this.game.getItem(champ.eq_sword).then(res => {this.itemSword = res; this.loadingCompleted.eq_sword = true; this.checkIfLoadingCompleted();});
      this.game.getItem(champ.eq_shield).then(res => {this.itemShield = res; this.loadingCompleted.eq_shield = true; this.checkIfLoadingCompleted();});
      this.game.getItem(champ.eq_helmet).then(res => {this.itemHelmet = res; this.loadingCompleted.eq_helmet = true; this.checkIfLoadingCompleted();});
      this.checkIfLoadingCompleted();
	});  
  }

  ///@dev if champ and items are loaded than loading is completed
  checkIfLoadingCompleted(){
    if(this.loadingCompleted.champ && this.loadingCompleted.isOwnerOfChamp && this.loadingCompleted.eq_sword && this.loadingCompleted.eq_shield && this.loadingCompleted.eq_helmet && this.game.MetaMaskError == 0){
      this.loading = false;
    }
  }

  ///@notice Calls Web3 in Game service
  getReward(_champId:number){
  	this.game.withdrawChamp(_champId);
  }

  ///@notice Calls Web3 in Game service
  setForSale(_champId:number,_price:number){
  	this.game.setChampForSale(_champId,_price);
  }

  ///@notice Calls Web3 in Game service
  cancelSale(_champId:number){
    this.game.cancelChampSale(_champId);
  }

  ///@notice Calls Web3 in Game service
  sendAsGift(_toAddress:string,_champId:number){
  	this.game.giveChamp(_toAddress.trim(),_champId);
  }

  ///@notice Calls Web3 in Game service
  attackChamp(_attackerId:number,_targetId:number){
  	this.game.attack(_attackerId, _targetId);
  }

  ///@notice Calls Web3 in Game service
  renameChamp(){
    this.game.changeChampsName(this.champ.id, this.newName);
  }

  ///@notice Calls Web3 in Game service
  ///@param _price In Ether. Has to be converted to wei
  buyChamp(_champId:number,_price:number){
  	this.game.buyChamp(_champId,_price * 1000000000000000000,this.affiliateAddress);
  }

  ///@notice Function for open Boostrap modal
  openModal(modal) {
    this.game.nullWeb3Message();
    this.modalService.open(modal, { centered: true });
  }

  ngOnDestroy() {
    this._onDestroy.next();
  }

}
