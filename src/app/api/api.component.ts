import { Component, OnDestroy } from '@angular/core';
import { GameService } from '../game.service';
import { ActivatedRoute } from '@angular/router'; 
import { Subject } from 'rxjs/Subject';
import * as Web3 from 'web3';
import { GetterService } from '../getter.service';
import { Observable } from 'rxjs/Rx';

declare let require: any;
declare let window: any;

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class ApiComponent implements OnDestroy {

  version:number;
  type:string = "player";
  id:string;

  private _onDestroy = new Subject();	
  private _subscription:any;

  private _account: string = null;
  private _web3: any;

  private _tokenContract: any;
  private _tokenContractAddress: string = "0xa44e464b13280340904FfEF0a65b8a0033460430";
  private _abi:any = [{"constant": true,"inputs": [],"name": "getItemsForSale","outputs": [{"name": "","type": "uint256[]"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "itemsForSaleCount","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "uint256"}],"name": "itemToOwner","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "champsForSaleCount","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "addressInfo","outputs": [{"name": "withdrawal","type": "uint256"},{"name": "champsCount","type": "uint256"},{"name": "itemsCount","type": "uint256"},{"name": "name","type": "string"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "_owner","type": "address"}],"name": "getItemsByOwner","outputs": [{"name": "","type": "uint256[]"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "getChampsCount","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "_affiliateAddress","type": "address"}],"name": "openLootbox","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": false,"inputs": [{"name": "_id","type": "uint256"}],"name": "withdrawChamp","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "_parentItemID","type": "uint256"},{"name": "_childItemID","type": "uint256"}],"name": "forgeItems","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [{"name": "_champId","type": "uint256"}],"name": "getChampStats","outputs": [{"name": "","type": "uint256"},{"name": "","type": "uint256"},{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "_champId","type": "uint256"},{"name": "_itemId","type": "uint256"}],"name": "putOn","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "getChampsForSale","outputs": [{"name": "","type": "uint256[]"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "_id","type": "uint256"}],"name": "cancelChampSale","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "_id","type": "uint256"}],"name": "buyChamp","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": false,"inputs": [{"name": "_name","type": "string"}],"name": "changePlayersName","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "_to","type": "address"},{"name": "_champId","type": "uint256"}],"name": "giveChamp","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [],"name": "triggerPause","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [{"name": "","type": "uint256"}],"name": "champToName","outputs": [{"name": "","type": "string"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "_affiliateAddress","type": "address"}],"name": "createChamp","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": true,"inputs": [{"name": "_position","type": "uint256"}],"name": "getChampReward","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "_address","type": "address"}],"name": "withdrawToAddress","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "_id","type": "uint256"},{"name": "_price","type": "uint256"}],"name": "setItemForSale","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "_champId","type": "uint256"},{"name": "_name","type": "string"}],"name": "changeChampsName","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [{"name": "","type": "uint256"}],"name": "leaderboard","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "uint256"}],"name": "items","outputs": [{"name": "itemType","type": "uint8"},{"name": "itemRarity","type": "uint8"},{"name": "attackPower","type": "uint256"},{"name": "defencePower","type": "uint256"},{"name": "cooldownReduction","type": "uint256"},{"name": "price","type": "uint256"},{"name": "onChampId","type": "uint256"},{"name": "onChamp","type": "bool"},{"name": "forSale","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "_id","type": "uint256"}],"name": "cancelItemSale","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [{"name": "","type": "uint256"}],"name": "champs","outputs": [{"name": "id","type": "uint256"},{"name": "attackPower","type": "uint256"},{"name": "defencePower","type": "uint256"},{"name": "cooldownTime","type": "uint256"},{"name": "readyTime","type": "uint256"},{"name": "winCount","type": "uint256"},{"name": "lossCount","type": "uint256"},{"name": "position","type": "uint256"},{"name": "price","type": "uint256"},{"name": "withdrawCooldown","type": "uint256"},{"name": "eq_sword","type": "uint256"},{"name": "eq_shield","type": "uint256"},{"name": "eq_helmet","type": "uint256"},{"name": "forSale","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "_fee","type": "uint256"}],"name": "setCreateChampFee","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "_to","type": "address"},{"name": "_itemID","type": "uint256"}],"name": "giveItem","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "_champId","type": "uint256"},{"name": "_type","type": "uint8"}],"name": "takeOffItem","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "_fee","type": "uint256"}],"name": "setLootboxFee","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "_champId","type": "uint256"},{"name": "_targetId","type": "uint256"}],"name": "attack","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "_id","type": "uint256"}],"name": "buyItem","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": false,"inputs": [{"name": "_id","type": "uint256"},{"name": "_price","type": "uint256"}],"name": "setChampForSale","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [{"name": "_owner","type": "address"}],"name": "getChampsByOwner","outputs": [{"name": "","type": "uint256[]"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "newOwner","type": "address"}],"name": "transferOwnership","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [{"name": "","type": "uint256"}],"name": "champToOwner","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"anonymous": false,"inputs": [{"indexed": false,"name": "from","type": "address"},{"indexed": false,"name": "to","type": "address"},{"indexed": false,"name": "champID","type": "uint256"}],"name": "TransferChamp","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"name": "winnerChampID","type": "uint256"},{"indexed": false,"name": "defeatedChampID","type": "uint256"},{"indexed": false,"name": "didAttackerWin","type": "bool"}],"name": "Attack","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"name": "forgedItemID","type": "uint256"}],"name": "Forge","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"name": "from","type": "address"},{"indexed": false,"name": "to","type": "address"},{"indexed": false,"name": "itemID","type": "uint256"}],"name": "TransferItem","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"name": "itemID","type": "uint256"},{"indexed": false,"name": "owner","type": "address"}],"name": "NewItem","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"name": "champID","type": "uint256"},{"indexed": false,"name": "owner","type": "address"}],"name": "NewChamp","type": "event"}];

  public result:object;


  constructor(private route: ActivatedRoute, private _getter: GetterService) { 
  	//Params
  	this.route.params.takeUntil(this._onDestroy).subscribe(res => { 
      if(this.type != res.type || this.id != res.id){
        this.type = res.type;
        this.id = res.id;
        this.version = res.v;
      }     
    });

  	//Web3
    if (typeof window.web3 !== 'undefined') {
      this._web3 = new Web3(window.web3.currentProvider);
    } else {
      this._web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/VIUtWIeXNV5D1syyWLst"));
    }

    this._tokenContract = this._web3.eth.contract(this._abi).at(this._tokenContractAddress);

    //Serve request
    if(this.version == 1){
      if(this.type=="address"){
        this.apiPlayer(this.id);
      }

      if(this.type=="market"){
        this.apiMarket();
      }

      if(this.type=="champ"){
        this.apiChamp(Number(this.id));
      }

      if(this.type=="item"){
        this.apiItem(Number(this.id));
      }
    }
    
  }


  ngOnDestroy() {
  	this._onDestroy.next();
  }


  async apiPlayer(_address:string){
  	let name = await this._getter.getAddressName(this._tokenContract, _address);
  	//let cashback = await this._getter.getWithdrawalPending(this._tokenContract, _address);
  	let champs = await this._getter.getChampsByOwner(this._tokenContract, _address);
  	let items = await this._getter.getItemsByOwner(this._tokenContract, _address);

  	this.result = {"name": name, "champs":champs, "items":items};
  }

  async apiChamp(_id:number){
    await this._getter.getChamp(this._tokenContract, _id).then(res => {
    	let champ = res;
      let img = this._getter.getChampImg(champ.id);
      let bgColor = this._getter.getBgColorHEX(this._getter.getBackgroundColor(champ.id));

      this.result = {
        'id': champ.id, 
        'name': champ.name,
        'ownersAddress': champ.owner,
        'ownersName': champ.ownerName,
        'img': "https://mycryptochamp.io/assets/img/champs-md/" + img,
        'bgColor': bgColor,

        'attackPower': champ.attackPower, 
        'defencePower': champ.defencePower,
        'cooldownTime': champ.cooldownReduction, 

        //'readyTime': champ.readyTime, 
        'winCount': champ.winCount, 
        'lossCount': champ.lossCount, 
        'position': champ.position, 
        'forSale': champ.forSale,
        'price': champ.price, 
        //'rewardReady': champ.withdrawalReady, 

        'sword': champ.eq_sword, 
        'shield': champ.eq_shield, 
        'helmet': champ.eq_helmet
        //'attackPowerWithoutItems': champ.basicAttackPower, 
        //'defencePowerWithoutItems': champ.basicDefencePower,
        //'cooldownTimeWithoutItems': champ.basicCooldownReduction 
        
      }
    });
  }

  async apiItem(_id:number){
    if(_id != 0){
      await this._getter.getItem(this._tokenContract, _id).then(res => {
      	let item = res;
        let img = this._getter.getItemImg(item.id, item.type, item.rank);
        let bgColor = this._getter.getBgColorHEX(this._getter.getBackgroundColor(item.id));

        this.result = {
           'id': item.id,
           'type': item.type, 
           'rarity': item.rank, 
           'ownersAddress': item.owner,
           'ownersName': item.ownerName,
           'img': "https://mycryptochamp.io/assets/img/items-md/" + img,
           'bgColor': bgColor,

           'attackPower': item.attackPower, 
           'defencePower': item.defencePower, 
           'cooldownReduction': item.cooldownReduction, 

           'forSale': item.forSale,
           'price': item.price, 

           'onChamp': item.onChamp,
           'onChampID': item.onChampID, 
        }

      });
    }
  }


  async apiMarket(){
  	let champs = await this._getter.getChampsForSale(this._tokenContract);
  	let items = await this._getter.getItemsForSale(this._tokenContract); 

    this.result = {
      "champs" : champs,
      "items" : items
    }
  }





}
