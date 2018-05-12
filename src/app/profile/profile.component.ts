import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameService } from '../game.service';
import { OrderPipe } from 'ngx-order-pipe';
import { ActivatedRoute, Router } from '@angular/router'; 
import { Observable } from 'rxjs/Rx';
import Avatars from '@dicebear/avatars';
import SpriteCollection from '@dicebear/avatars-identicon-sprites';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', '../portfolio/portfolio.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  
  address:string;
  addressName:string;
  champsCount:number = 0;
  itemsCount:number = 0;
  champs:any = [];
  items:any = [];
  blockTimestamp:number;

  //loading
  loaderSubscription:any;
  loading:boolean = true;
  getChampsCountResponse:boolean = false;
  getItemsCountResponse:boolean = false;

  //subscribitions -- unsubscribe on destroy
  paramSubscription:any;
  updateSubscription:any;
  addressChampsCountSubscription:any;
  addressItemsCountSubscription:any;
  addressChampsSubscription:any;
  addressItemsSubscription:any;
 
  avatars:any;

  //ordering
  orderChamps: string = 'id';
  reverseChamps: boolean = false;

  orderItems: string = 'id';
  reverseItems: boolean = false;

  private _onDestroy = new Subject();

  constructor(private route: ActivatedRoute, public game: GameService, private router: Router) { }

  ngOnInit() {
    this.route.params.takeUntil(this._onDestroy).subscribe(res => { 
      this.address = res.address;
    });
    this.game.addressChampsCount.takeUntil(this._onDestroy).subscribe(res => this.champsCount = res);
    this.game.addressItemsCount.subscribe(res => this.itemsCount = res);
    this.game.addressChamps.takeUntil(this._onDestroy).subscribe(res => this.champs = res);
    this.game.addressItems.takeUntil(this._onDestroy).subscribe(res => this.items = res);
    this.game.blockTimestamp.takeUntil(this._onDestroy).subscribe(res => this.blockTimestamp = res);

    this.game.getAccount().then(res => {
      if(res == this.address){
        this.router.navigate(['/portfolio']);
      }
    });
    
    this.loaderSubscription = Observable.interval(100).subscribe(x => {
      if(this.getChampsCountResponse && this.getItemsCountResponse && this.champsCount == this.champs.length && this.itemsCount == this.items.length && this.game.MetaMaskError == 0){ 
        this.loading = false; 
        this.loaderSubscription.unsubscribe(); 
      }
    });
    

  	//keep updated
    Observable.timer(0,8000).takeUntil(this._onDestroy).subscribe(x => {
      this.update();
    });

    this.avatars = new Avatars(SpriteCollection);

  }

  ///@notice Updates everything
  async update(){

    //reload address name
    this.addressName = await this.game.getAddressName(this.address);
    
    //my champs count
    this.game.getChampsCount(this.address).then(res => { 
      this.getChampsCountResponse = true;
      this.champsCount = res;
      this.game.updateAddressChampsCount(res); 
    });
     
    //my items count
    this.game.getItemsCount(this.address).then(res => { 
      this.getItemsCountResponse = true;
      this.itemsCount = res;
      this.game.updateAddressItemsCount(res); 
    });

    //block timestamp
    this.game.reloadBlockTimestamp();
    //my items
    this.game.reloadAddressItems(this.address);
    //my champs
    this.game.reloadAddressChamps(this.address); 
  }


  ///@dev Gets item's info from Items
  getItem(_itemID:number){
    for(let i = 0; i < this.items.length; i++){
      let item = this.items[i];
      if(item.id == _itemID){
        return item;
      }  
    }
  }

  ngOnDestroy() {
    this.game.updateAddressChampsCount(0);
    this.game.updateAddressItemsCount(0);
    this.game.updateAddressItems([]);
    this.game.updateAddressChamps([]);
    this._onDestroy.next();
  }

}
