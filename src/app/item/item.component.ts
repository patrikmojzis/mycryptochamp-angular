import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameService } from '../game.service';
import { ActivatedRoute } from '@angular/router'; 
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderPipe } from 'ngx-order-pipe';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit, OnDestroy {

  myChampsCount:number = 0;
  myChamps:any = [];
  id:number;
  item:any;
  isOwner:boolean = false;
  myAddress:string;

  //if player wants sell champ
  sellingPrice:number = 0.01;
  //if player wants give champ
  giftRecieverAddress:string = "0x";

  //loading
  loading:boolean = true;

  private _onDestroy = new Subject();

  constructor(public game: GameService, private route: ActivatedRoute, private modalService: NgbModal, private orderPipe: OrderPipe) {
    ///subscription
    this.route.params.takeUntil(this._onDestroy).subscribe(res => { 
  		this.id = +res.id;
  	});
    this.game.myChampsCount.takeUntil(this._onDestroy).subscribe(res => this.myChampsCount = res);
    this.game.myChamps.takeUntil(this._onDestroy).subscribe(res => this.myChamps = res);
  }

  ///@dev starts after delay few ms to let subscribe time
  ngOnInit() {
    Observable.timer(100,2000).takeUntil(this._onDestroy).subscribe(x => {
      if(this.id){
        this.getItemInfo();
        this.game.reloadMyChamps();
      }
    });

    this.game.getAccount().then(res => this.myAddress = res);
  }

  ///@notice Gets item info
  ///@dev Item info are sets in this.item
  ///@dev Sets player is owner
  ///@dev After 400ms stops loading, that delay if myChamps is not loading properly
  getItemInfo(){
  	this.game.getItem(this.id).then(item => { 
  		this.item = item;
  		this.game.isOwnerOfItem(item.id,null).then(res => { 
        this.isOwner = res;
        setTimeout(()=>{ this.loading = false; }, 400)
      });
	  });  
  }

  ///@notice Calls Web3 in Game service
  setForSale(_itemId:number,_price:number){
  	this.game.setItemForSale(_itemId,_price);
  }

  ///@notice Calls Web3 in Game service
  sendAsGift(_toAddress:string,_itemId:number){
  	this.game.giveItem(_toAddress.trim(),_itemId);
  }

  ///@notice Calls Web3 in Game service
  ///@param _price In Ether. Has to be converted to wei
  buyItem(_itemId:number,_price:number){
  	this.game.buyItem(_itemId,_price * 1000000000000000000);
  }

  ///@notice Calls Web3 in Game service
  putOn(_itemId:number,_champId:number,_itemOnChampId:number,_itemType:string,_onChamp:boolean){
    if(_onChamp && _champId == _itemOnChampId){
      let itemType:number;
        if(_itemType == "sword"){
            itemType = 1;
          }

          if(_itemType == "shield"){
            itemType = 2;
          }

          if(_itemType == "helmet"){
            itemType = 3;
          }
        this.game.takeOffItem(_champId, itemType);
    }else{
      this.game.putOnItem(_itemId,_champId);
    }
  }

  ///@notice Calls Web3 in Game service
  cancelSale(_itemId:number){
    this.game.cancelItemSale(_itemId);
  }

  ///@notice Function for open Boostrap modal
  openModal(modal) {
    this.modalService.open(modal, { centered: true });
  }

  ngOnDestroy() {
    this._onDestroy.next();
  }

 
}
