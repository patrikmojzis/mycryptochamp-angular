import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameService } from '../game.service';
import { OrderPipe } from 'ngx-order-pipe';
import { Observable } from 'rxjs/Rx';
import { CookieService } from 'ngx-cookie-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Avatars from '@dicebear/avatars';
import SpriteCollection from '@dicebear/avatars-identicon-sprites';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})

export class PortfolioComponent implements OnInit, OnDestroy {

  myAddressName:string;
  newName:string;
  myChampsCount:number = 0;
  myItemsCount:number = 0;
  myChamps:any = [];
  myItems:any = [];
  blockTimestamp:number;

  affiliateAddress:string;
  
  //loading
  loaderSubscription:any;
  loading:boolean = true;
  getChampsCountResponse:boolean = false;
  getItemsCountResponse:boolean = false;

  avatars:any;

   //ordering
  orderChamps: string = 'id';
  reverseChamps: boolean = false;

  orderItems: string = 'id';
  reverseItems: boolean = false;

  totalWithdrawalPending:number = 0;

  //champsForSale:any;

  private _onDestroy = new Subject();

  constructor(public game: GameService, private orderPipe: OrderPipe, private cookieService: CookieService, private modalService: NgbModal) {
    //SUBSCRIBE PART
    this.game.myChampsCount.takeUntil(this._onDestroy).subscribe(res => this.myChampsCount = res);
    this.game.myItemsCount.takeUntil(this._onDestroy).subscribe(res => this.myItemsCount = res);
    this.game.myChamps.takeUntil(this._onDestroy).subscribe(res => this.myChamps = res);
    this.game.myItems.takeUntil(this._onDestroy).subscribe(res => this.myItems = res);
    this.game.blockTimestamp.takeUntil(this._onDestroy).subscribe(res => this.blockTimestamp = res);
    this.game.myAddressName.takeUntil(this._onDestroy).subscribe(res => this.myAddressName = res);
    this.game.myWithdrawalPending.takeUntil(this._onDestroy).subscribe(res => this.totalWithdrawalPending = res);
    
    //this.game.champsForSale.takeUntil(this._onDestroy).subscribe(res => this.champsForSale = res);

    if(this.myChamps.length > 0 || this.myItems.length > 0){
      this.loading = false; 
    }else{
      this.loaderSubscription = Observable.interval(100).subscribe(x => {
        if(this.getChampsCountResponse && this.getItemsCountResponse && this.myChampsCount == this.myChamps.length && this.myItemsCount == this.myItems.length && this.game.MetaMaskError == 0){ 
          this.loading = false; 
          this.loaderSubscription.unsubscribe(); 
        }
      });
    }

  }

  ngOnInit() {
    //get affiliate address
    this.affiliateAddress = (this.cookieService.get('affiliateAddress') != '') ? this.cookieService.get('affiliateAddress') : null; 

    //keep updated
    Observable.timer(0,8000).takeUntil(this._onDestroy).subscribe(x => {
      this.update();
    });

    this.avatars = new Avatars(SpriteCollection);

  }

  ///@notice Updates everything
  update(){
    //reload address name
    this.reloadAddressName();
    
    //my champs count
    this.game.getChampsCount(null).then(res => { 
      this.getChampsCountResponse = true;
      this.myChampsCount = res;
      this.game.updateMyChampsCount(res); 
    });
     
    //my items count
    this.game.getItemsCount(null).then(res => { 
      this.getItemsCountResponse = true;
      this.myItemsCount = res;
      this.game.updateMyItemsCount(res); 
    });

    //block timestamp
    this.game.reloadBlockTimestamp();
    //my items
    this.game.reloadMyItems();
    //my champs
    this.game.reloadMyChamps(); 

    ///Gets withdrawal pendings and than update subscribtion
    this.game.getWithdrawalPending(null).then(res => { 
      this.totalWithdrawalPending = res;
      this.game.updateMyWithdrawalPending(res);
    });

    //reload market
    this.game.reloadChampsForSale();
    this.game.reloadItemsForSale();
  }

  async reloadAddressName(){
    this.game.updateMyAddressName(await this.game.getAddressName(this.game._account));
  }

  ///@notice Calls Web3 in Game service
  createNewChamp() {
    this.game.createNewChamp(this.affiliateAddress);
  }

  ///@notice Calls Web3 in Game service
  openLootbox() {
    this.game.openLootbox(this.affiliateAddress);
  }

  ///@dev Gets item's info from myItems
  getMyItem(_itemID:number){
    for(let i = 0; i < this.myItems.length; i++){
      let item = this.myItems[i];
      if(item.id == _itemID){
        return item;
      }  
    }
  }
  
  ///@notice Calls Web3 in Game service
  renameAddress(){
    this.game.changePlayersName(this.newName);
  }

  ///@notice Function for open Boostrap modal
  openModal(modal) {
    this.game.nullWeb3Message();
    this.modalService.open(modal, { centered: true });
  }

  ///@notice Calls Web3 in Game service
  withdrawFunds(){
    if(this.totalWithdrawalPending > 0){
      this.game.withdrawalFunds(null);
    }  
  }

  ngOnDestroy() {
    this._onDestroy.next();
  }

}
