import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameService } from '../game.service';
import { ActivatedRoute } from '@angular/router'; 
import { OrderPipe } from 'ngx-order-pipe';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit, OnDestroy  {

  category:string = "champs";
  itemToShow:any;

  champsForSale:any;
  swordsForSale:any;
  shieldsForSale:any;
  helmetsForSale:any;

  tooltipPlacement:string = "top";

  //ordering
  order: string = 'price';
  reverse: boolean = false;

  //loading
  loading:boolean = true;

  //paginator
  itemPerPage:number = 10;
  actualPage:number = 1;

  rankFilter:string;

  private _onDestroy = new Subject();

  constructor(public game: GameService, private route: ActivatedRoute, private orderPipe: OrderPipe) {
    this.route.params.takeUntil(this._onDestroy).subscribe(res => { 
      if(this.category != res.categor){
        this.actualPage = 1;
        this.category = res.category;
        this.getItems();
      }     
    });
  }

  ngOnInit() {
    //SUBSCRIBE PART
    this.game.champsForSale.takeUntil(this._onDestroy).subscribe(res => this.champsForSale = res);
    this.game.swordsForSale.takeUntil(this._onDestroy).subscribe(res => this.swordsForSale = res);
    this.game.shieldsForSale.takeUntil(this._onDestroy).subscribe(res => this.shieldsForSale = res);
    this.game.helmetsForSale.takeUntil(this._onDestroy).subscribe(res => this.helmetsForSale = res);
  }

  ///@dev Loads items by priority
  getItems(){
    if(this.category == "champs"){
      this.game.reloadChampsForSale();
      this.game.reloadItemsForSale();
    }else{
      this.game.reloadItemsForSale();
      this.game.reloadChampsForSale();
    }
  }

  filterByRank(item) : boolean{
    return item.rank == this.rankFilter;
  }

  ngOnDestroy() {
    this._onDestroy.next();
  }

}
