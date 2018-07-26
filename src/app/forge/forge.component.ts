import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameService } from '../game.service';
import { Observable } from 'rxjs/Rx';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs/Subject';


@Component({
  selector: 'app-forge',
  templateUrl: './forge.component.html',
  styleUrls: ['./forge.component.css']
})
export class ForgeComponent implements OnInit, OnDestroy {

  myItemsCount:number = 0;
  myItems:any = [];

  //loading
  loaderSubscription:any;
  loading:boolean = true;

  parentItem:number;
  childItem:number;

  affiliateAddress:string;

  howDoesForgeWork:boolean = true;

  changeParentOnNextClick:boolean = true;

  helmetsForSale:any;

  private _onDestroy = new Subject();

  constructor(public game: GameService, private cookieService: CookieService) { 
  	this.game.myItemsCount.takeUntil(this._onDestroy).subscribe(res => this.myItemsCount = res);
  	this.game.myItems.takeUntil(this._onDestroy).subscribe(res => this.myItems = res);

    this.game.helmetsForSale.takeUntil(this._onDestroy).subscribe(res => this.helmetsForSale = res);

  	if(this.myItems.length != 0){
      this.loading = false;
    }else{
      this.loaderSubscription = Observable.interval(600).subscribe(x => {
        if(this.myItemsCount == this.myItems.length && this.game.MetaMaskError == 0){ 
          this.loading = false; 
          this.loaderSubscription.unsubscribe(); 
        }
      });
    }

  }

  ngOnInit() {
    this.affiliateAddress = (this.cookieService.get('affiliateAddress') != '') ? this.cookieService.get('affiliateAddress') : null; 

  	//keep updated
    Observable.timer(0,8000).takeUntil(this._onDestroy).subscribe(x => {
      this.update();
    });
  }

  update(){
  	//my items count
    this.game.getItemsCount(null).then(res => { 
      this.myItemsCount = res;
      this.game.updateMyItemsCount(res); 
    });

    //my items
    this.game.reloadMyItems();
    this.game.reloadItemsForSale();
  }


  forge(_parentItemID, _childItemID){
  	this.game.forgeItems(_parentItemID, _childItemID);
  }




  ///forged item (FI)
  FIgetType(){
    if(this.myItems.findIndex(item => item.id==this.parentItem) !== -1){
      return this.myItems[this.myItems.findIndex(item => item.id==this.parentItem)].type;
    }
  }

  FIgetAttackPower(){
    if(this.myItems.findIndex(item => item.id==this.parentItem) !== -1 && this.myItems.findIndex(item => item.id==this.childItem) !== -1){
      let p =  this.myItems[this.myItems.findIndex(item => item.id==this.parentItem)].attackPower;
      let c = this.myItems[this.myItems.findIndex(item => item.id==this.childItem)].attackPower;
      return p > c ? p : c;
    }
   }

    FIgetDefencePower(){
      if(this.myItems.findIndex(item => item.id==this.parentItem) !== -1 && this.myItems.findIndex(item => item.id==this.childItem) !== -1){
        let p =  this.myItems[this.myItems.findIndex(item => item.id==this.parentItem)].defencePower;
        let c = this.myItems[this.myItems.findIndex(item => item.id==this.childItem)].defencePower;
        return p > c ? p : c;
      }
    }

    FIgetCooldownReduction(){
      if(this.myItems.findIndex(item => item.id==this.parentItem) !== -1 && this.myItems.findIndex(item => item.id==this.childItem) !== -1){
        let p =  this.myItems[this.myItems.findIndex(item => item.id==this.parentItem)].cooldownReduction;
        let c = this.myItems[this.myItems.findIndex(item => item.id==this.childItem)].cooldownReduction;
        return p > c ? p : c;
      }
    }

    /*
    ///@notice Calls Web3 in Game service
    openLootbox() {
      this.game.openLootbox(this.affiliateAddress);
    }
    */

    ngOnDestroy() {
      this._onDestroy.next();
    }

    clickItem(_id:number){
      if(this.changeParentOnNextClick){
        this.parentItem = _id;
        this.changeParentOnNextClick = !this.changeParentOnNextClick;
      }else{
        this.childItem = _id;
        this.changeParentOnNextClick = !this.changeParentOnNextClick;
      }
    }

}
