import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
//import * as Web3 from 'web3';

declare let Web3: any;
declare let require: any;
declare let window: any;

///@Title Service with injectable game functions
///@Author Patrik Mojzis
@Injectable()
export class GameService {

  //HEADER
  //My withdrawal pending
  private myWithdrawalPendingSource = new BehaviorSubject<number>(0);
  myWithdrawalPending = this.myWithdrawalPendingSource.asObservable();

  //PORTFOLIO
  //My items count
  private myItemsCountSource = new BehaviorSubject<number>(0);
  myItemsCount = this.myItemsCountSource.asObservable();

  //My champs count
  private myChampsCountSource = new BehaviorSubject<number>(0);
  myChampsCount = this.myChampsCountSource.asObservable();

  //My champs
  private myChampsSource = new BehaviorSubject<any>([]);
  myChamps = this.myChampsSource.asObservable();

  //My items
  private myItemsSource = new BehaviorSubject<any>([]);
  myItems = this.myItemsSource.asObservable();

  private myAddressNameSource = new BehaviorSubject<any>([]);
  myAddressName = this.myAddressNameSource.asObservable();

  //ADDRESS
  //Address items count
  private addressItemsCountSource = new BehaviorSubject<number>(0);
  addressItemsCount = this.addressItemsCountSource.asObservable();

  //Address champs count
  private addressChampsCountSource = new BehaviorSubject<number>(0);
  addressChampsCount = this.addressChampsCountSource.asObservable();

  //Address champs
  private addressChampsSource = new BehaviorSubject<any>([]);
  addressChamps = this.addressChampsSource.asObservable();

  //Address items
  private addressItemsSource = new BehaviorSubject<any>([]);
  addressItems = this.addressItemsSource.asObservable();

  //MARKET
  //Champs for sale
  private champsForSaleSource = new BehaviorSubject<any>([]);
  champsForSale = this.champsForSaleSource.asObservable();

  //Swords for sale
  private swordsForSaleSource = new BehaviorSubject<any>([]);
  swordsForSale = this.swordsForSaleSource.asObservable();

  //Shield for sale
  private shieldsForSaleSource = new BehaviorSubject<any>([]);
  shieldsForSale = this.shieldsForSaleSource.asObservable();

  //Helmets for sale
  private helmetsForSaleSource = new BehaviorSubject<any>([]);
  helmetsForSale = this.helmetsForSaleSource.asObservable();

  //GAME SERVICE PRIVATE
  //my champs&items
  private _myChampsIDs:any = [];
  private _myChamps:any = [];

  private _myItemsIDs:any = [];
  private _myItems:any = [];

  //address champs&items
  private _addressChampsIDs:any = [];
  private _addressChamps:any = [];

  private _addressItemsIDs:any = [];
  private _addressItems:any = [];

  //champs&items for sale
  private _champsForSaleIDs:any = [];
  private _champsForSale:any = [];

  private _itemsForSaleIDs:any = [];

  private _swordsForSale:any = [];
  private _shieldsForSale:any = [];
  private _helmetsForSale:any = [];


  //WEB 3
  public _account: string = null;
  private _web3: any;
  
  private _abi:any = [{"constant": true,"inputs": [],"name": "getItemsForSale","outputs": [{"name": "","type": "uint256[]"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "itemsForSaleCount","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "uint256"}],"name": "itemToOwner","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "champsForSaleCount","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "addressInfo","outputs": [{"name": "withdrawalPending","type": "uint256"},{"name": "champsCount","type": "uint256"},{"name": "itemsCount","type": "uint256"},{"name": "name","type": "string"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "_owner","type": "address"}],"name": "getItemsByOwner","outputs": [{"name": "","type": "uint256[]"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "getChampsCount","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "_affiliateAddress","type": "address"}],"name": "openLootbox","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": false,"inputs": [{"name": "_id","type": "uint256"}],"name": "withdrawChamp","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [],"name": "setOwnership","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [],"name": "withdrawContractOwner","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "_parentItemID","type": "uint256"},{"name": "_childItemID","type": "uint256"}],"name": "forgeItems","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [{"name": "_champId","type": "uint256"}],"name": "getChampStats","outputs": [{"name": "","type": "uint256"},{"name": "","type": "uint256"},{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "_champId","type": "uint256"},{"name": "_itemId","type": "uint256"}],"name": "putOn","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "getChampsForSale","outputs": [{"name": "","type": "uint256[]"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "_id","type": "uint256"}],"name": "cancelChampSale","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "_id","type": "uint256"}],"name": "buyChamp","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": false,"inputs": [{"name": "_name","type": "string"}],"name": "changePlayersName","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "_to","type": "address"},{"name": "_tokenId","type": "uint256"}],"name": "giveChamp","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [],"name": "triggerPause","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [{"name": "","type": "uint256"}],"name": "champToName","outputs": [{"name": "","type": "string"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "_affiliateAddress","type": "address"}],"name": "createChamp","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": true,"inputs": [{"name": "_position","type": "uint256"}],"name": "getChampReward","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "_address","type": "address"}],"name": "withdrawToAddress","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "_id","type": "uint256"},{"name": "_price","type": "uint256"}],"name": "setItemForSale","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "_champId","type": "uint256"},{"name": "_name","type": "string"}],"name": "changeChampsName","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [{"name": "","type": "uint256"}],"name": "leaderboard","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "uint256"}],"name": "items","outputs": [{"name": "itemType","type": "uint8"},{"name": "itemRarity","type": "uint8"},{"name": "attackPower","type": "uint256"},{"name": "defencePower","type": "uint256"},{"name": "cooldownReduction","type": "uint256"},{"name": "price","type": "uint256"},{"name": "onChampId","type": "uint256"},{"name": "onChamp","type": "bool"},{"name": "forSale","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "_id","type": "uint256"}],"name": "cancelItemSale","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [{"name": "","type": "uint256"}],"name": "champs","outputs": [{"name": "id","type": "uint256"},{"name": "attackPower","type": "uint256"},{"name": "defencePower","type": "uint256"},{"name": "cooldownTime","type": "uint256"},{"name": "readyTime","type": "uint256"},{"name": "winCount","type": "uint256"},{"name": "lossCount","type": "uint256"},{"name": "position","type": "uint256"},{"name": "price","type": "uint256"},{"name": "withdrawCooldown","type": "uint256"},{"name": "eq_sword","type": "uint256"},{"name": "eq_shield","type": "uint256"},{"name": "eq_helmet","type": "uint256"},{"name": "forSale","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "_fee","type": "uint256"}],"name": "setCreateChampFee","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "_to","type": "address"},{"name": "_tokenId","type": "uint256"}],"name": "giveItem","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "_champId","type": "uint256"},{"name": "_type","type": "uint8"}],"name": "takeOffItem","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "_fee","type": "uint256"}],"name": "setLootboxFee","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "_champId","type": "uint256"},{"name": "_targetId","type": "uint256"}],"name": "attack","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "_id","type": "uint256"}],"name": "buyItem","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": false,"inputs": [{"name": "_id","type": "uint256"},{"name": "_price","type": "uint256"}],"name": "setChampForSale","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [{"name": "_owner","type": "address"}],"name": "getChampsByOwner","outputs": [{"name": "","type": "uint256[]"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "newOwner","type": "address"}],"name": "transferOwnership","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [{"name": "","type": "uint256"}],"name": "champToOwner","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"anonymous": false,"inputs": [{"indexed": false,"name": "from","type": "address"},{"indexed": false,"name": "to","type": "address"},{"indexed": false,"name": "champID","type": "uint256"}],"name": "TransferChamp","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"name": "winnerChampID","type": "uint256"},{"indexed": false,"name": "defeatedChampID","type": "uint256"},{"indexed": false,"name": "didAttackerWin","type": "bool"}],"name": "Attack","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"name": "forgedItemID","type": "uint256"}],"name": "Forge","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"name": "from","type": "address"},{"indexed": false,"name": "to","type": "address"},{"indexed": false,"name": "itemID","type": "uint256"}],"name": "TransferItem","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"name": "itemID","type": "uint256"},{"indexed": false,"name": "owner","type": "address"}],"name": "NewItem","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"name": "champID","type": "uint256"},{"indexed": false,"name": "owner","type": "address"}],"name": "NewChamp","type": "event"}];
  public _tokenContract: any;
  private _tokenContractAddress: string = "0x42D08a963Cd55972aA827E771409e9138165a5FA"; 

  //block timestamp
  blockTimestampSource = new BehaviorSubject<number>(0);
  blockTimestamp = this.blockTimestampSource.asObservable();
    
  //informations
  public numPlayersAbleWithdrawal: number = 800;

  //nothing to sale?
  public champsNothingToSale:boolean = true;
  public swordsNothingToSale:boolean = true;
  public shieldsNothingToSale:boolean = true; 
  public helmetsNothingToSale:boolean = true;

  //messeges
  public web3message:any = {'called': false, 'error':null, 'result':null, 'calledFrom':null};

  public MetaMaskError:number = 0;
  
 ///@notice creates web3 and connects to contract
 constructor() {
    //checks for WEB3
    if (typeof window.web3 !== 'undefined') {
      // Use Mist/MetaMask's provider
      this._web3 = new Web3(window.web3.currentProvider);

      this._web3.version.getNetwork((err, network) => {
        if (network !== '4') {
          //console.warn('Please connect to the Robsten network');
          this.MetaMaskError = 1;
        }
      });
    } else {
      //console.warn('Please use a dapp browser like mist or MetaMask plugin for chrome');
      this.MetaMaskError = 2;
    }
    
    //If web3 found and user is connected on the correct network then acc and timestamp is are being getted
    if(this.MetaMaskError == 0){
      this._tokenContract = this._web3.eth.contract(this._abi).at(this._tokenContractAddress);
      this.getAccount();
      this.reloadBlockTimestamp();
    }
  }


  ///@notice Reload block timestamp
  reloadBlockTimestamp(){
    this.getBlockTimestamp().then(res => { 
      this.updateBlockTimestamp(res);
    }); 
  }


  ///@notice Gets block timestamp from web3
  ///@dev Used by reloadBlockTimestamp();
  public async getBlockTimestamp(): Promise<number> {
    return new Promise((resolve, reject) => {
      this._web3.eth.getBlock('latest', function (err, block) {
        if(err != null) {
          reject(err);
        }
        resolve(block.timestamp);
      });
    }) as Promise<number>;
  }


  ///@notice Gets ethereum account
  public async getAccount(): Promise<string> {

    if (this.MetaMaskError != 0 && this.MetaMaskError != 3 && this.MetaMaskError != 4) {
       return Promise.resolve('undefined');
    }

  	if (this._account == null) {
  	  this._account = await new Promise((resolve, reject) => {
  	    this._web3.eth.getAccounts((err, accs) => {
  	      if (err != null) {
  	        //console.warn('There was an error fetching your accounts.');
            this.MetaMaskError = 3;
  	        return Promise.resolve('undefined');
  	        }

  	      if (accs.length === 0) {
  	        //console.warn('Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.');
            this.MetaMaskError = 4;
  	        return Promise.resolve('undefined');
  	      }
  	      resolve(accs[0]);
  	    })
  	  }) as string;

  	  this._web3.eth.defaultAccount = this._account;
  	  }
  	return Promise.resolve(this._account);
  }


  ///@notice Checks if user has changed account in metamask
  public checkIfAccountWasChanged(){
    this.getAccount().then(res => {
    if (this._web3.eth.accounts[0] !== this._account && this.MetaMaskError == 0){
      window.location.reload();
    }});
  }


  ///@notice Gets champs count
  ///@dev It's result[1] from addressInfo map
  ///@param _account User address
  public async getChampsCount(_account:string): Promise<number> {
	  let account = (_account) ? _account : await this.getAccount();

	  return new Promise((resolve, reject) => {

      if(this._tokenContract == undefined){
        reject('Err');
      }

	    this._tokenContract.addressInfo.call(account, function (err, result) {
	      if(err != null) {
	        reject(err);
	      }

	      resolve(+result[1]);
	    });
	  }) as Promise<number>;
  }


  ///@notice Gets withdrawal pendings
  ///@dev It's result[0] from addressInfo map
  ///@param _account User address
  public async getWithdrawalPending(_account:string): Promise<number> {
	  let account = (_account) ? _account : await this.getAccount();

	  return new Promise((resolve, reject) => {
	    this._tokenContract.addressInfo.call(account, function (err, result) {
	      if(err != null) {
	        reject(err);
	      }

	      resolve(+result[0]);
	    });
	  }) as Promise<number>;
  }


  ///@notice Gets items count
  ///@dev It's result[2] from addressInfo map
  ///@param _account User address
  public async getItemsCount(_account:string): Promise<number> {
	  let account = (_account) ? _account : await this.getAccount();

	  return new Promise((resolve, reject) => {
	    this._tokenContract.addressInfo.call(account, function (err, result) {
	      if(err != null) {
	        reject(err);
	      }

	      resolve(+result[2]);
	    });
	  }) as Promise<number>;
  }


  ///@notice Gets address name
  ///@dev It's result[3] from addressInfo map
  ///@param _account Player's name
  public async getAddressName(_account:string): Promise<string> {
    let account = (_account) ? _account : await this.getAccount();

    return new Promise((resolve, reject) => {
      this._tokenContract.addressInfo.call(account, function (err, result) {
        if(err != null) {
          reject(err);
        }
        if(result[3].trim() == ""){
          if(_account != null){
            result[3] = _account.substring(0, 13);
          }
        }else{
          result[3] = result[3].substring(0, 13);
        }

        //heaven :))
        if(result[3] == "0x00000000000"){
          result[3] = "Heaven";
        }

        resolve(result[3]);
      });
    }) as Promise<string>;
  }


  ///@notice Gets TOTAL champs count
  ///@dev Use in leadeboard
  public async getTotalChampsCount(): Promise<number> {

    return new Promise((resolve, reject) => {
      this._tokenContract.getChampsCount.call(function (err, result) {
        if(err != null) {
          reject(err);
        }

        resolve(+result);
      });
    }) as Promise<number>;
  }

  ///@notice Gets champs by owner
  ///@param _account User address
  ///@returns array of champs IDs
  public async getChampsByOwner(_account:string): Promise<any> {
	  let account = (_account) ? _account : await this.getAccount();

	  return new Promise((resolve, reject) => {
	    this._tokenContract.getChampsByOwner.call(account, function (err, result) {
	      if(err != null) {
	        reject(err);
	      }

	      resolve(result);
	    });
	  }) as Promise<any>;
  }


  ///@notice Gets items by owner
  ///@param _account User address
  ///@returns array of IDs
  public async getItemsByOwner(_account:string): Promise<any> {
	  let account = (_account) ? _account : await this.getAccount();

	  return new Promise((resolve, reject) => {
	    this._tokenContract.getItemsByOwner.call(account, function (err, result) {
	      if(err != null) {
	        reject(err);
	      }

	      resolve(result);
	    });
	  }) as Promise<any>;
  }

  ///@notice Gets champs informations
  ///@param _id Champ's id
  public async getChamp(_id:number): Promise<any> {

    let owner = await this.champToOwner(_id);
    let ownerName = await this.getAddressName(owner);
    let attackPower = await this.getChampAttackPower(_id);
    let defencePower = await this.getChampDefencePower(_id);
    let cooldownReduction = await this.getChampCooldownReduction(_id);
    let name = await this.getChampsName(_id);
    
	  return new Promise((resolve, reject) => {
	    this._tokenContract.champs.call(_id, function (err, result) {
	      if(err != null) {
	        reject(err);
	      }

	      resolve({
	      	'id': +result[0], 
	      	'basicAttackPower': +result[1], 
	      	'basicDefencePower': +result[2], 
	      	'basicCooldownTime': +result[3], 
          'attackPower': attackPower, 
          'defencePower': defencePower,
          'cooldownTime': +result[3] - cooldownReduction, 
	      	'readyTime': +result[4], 
	      	'winCount': +result[5], 
	      	'lossCount': +result[6], 
	      	'position': +result[7], 
	      	'price': +result[8] / 1000000000000000000, 
	      	'withdrawalReady': +result[9], 
	      	'eq_sword': +result[10], 
	      	'eq_shield': +result[11], 
	      	'eq_helmet':+ result[12], 
	      	'forSale': result[13],
          'owner': owner,
          'name': name,
          'ownerName': ownerName
	      });

	    });
	  }) as Promise<any>;
  }

  ///@notice Gets item informations
  ///@param _id Item's id
  public async getItem(_id:number): Promise<any> {

    let owner = await this.itemToOwner(_id);
    let ownerName = await this.getAddressName(owner);

	  return new Promise((resolve, reject) => {
	    this._tokenContract.items.call(_id, function (err, result) {
	      if(err != null) {
	        reject(err);
	      }
        let type = "empty";
        let rank = "common";

        if(result[0] == 1){
          type = "sword";
        }

        if(result[0] == 2){
          type = "shield";
        }

        if(result[0] == 3){
          type = "helmet";
        }


        if(result[1] == 1){
          rank = "common";
        }

        if(result[1] == 2){
          rank = "uncommon";
        }

        if(result[1] == 3){
          rank = "rare";
        }

        if(result[1] == 4){
          rank = "epic";
        }

        if(result[1] == 5){
          rank = "legendary";
        }

        if(result[1] == 6){
          rank = "forged";
        }

	      resolve({
          'id': +_id,
	      	'type': type, 
          'rank': rank, 
	      	'attackPower': +result[2], 
	      	'defencePower': +result[3], 
	      	'cooldownReduction': +result[4], 
	      	'price': +result[5] / 1000000000000000000, 
	      	'onChampID': result[6],
          'onChamp': result[7], 
	      	'forSale': result[8],
          'owner': owner,
          'ownerName': ownerName
	      });

	    });
	  }) as Promise<any>;
  }

  ///@notice Creates new champ
  ///@param _affiliateAddress Defined by cookies
  ///@dev If 'create new champ price' is changed needs to be changed also here
  createNewChamp(_affiliateAddress:string){
  	_affiliateAddress = (_affiliateAddress) ? _affiliateAddress : '0x0000000000000000000000000000000000000000';
    this._tokenContract.createChamp.estimateGas(_affiliateAddress, {from: this._account, value: this._web3.toWei(5, 'finney')}, (err, gas) => {
      if(err == null){
      	this._tokenContract.createChamp(_affiliateAddress, {
            gas: gas + 80000,
            value: this._web3.toWei(5, 'finney')
         	}, (err, result) => {
                this.web3message.called = true;
                this.web3message.calledFrom = 'createNewChamp';
                if(err){this.web3message.error = err;}
                if(result){this.web3message.result = result;}
        });
      }else{
        console.log(err);
      }
     });    
  }


  ///@notice Creates new item
  ///@param _affiliateAddress Defined by cookies
  ///@dev If 'create new item price' is changed needs to be changed also here
  openLootbox(_affiliateAddress:string){
  	_affiliateAddress = (_affiliateAddress) ? _affiliateAddress : '0x0000000000000000000000000000000000000000';

    this._tokenContract.openLootbox.estimateGas(_affiliateAddress, {from: this._account, value: this._web3.toWei(5, 'finney')}, (err, gas) => {
      if(err == null){
      	this._tokenContract.openLootbox(_affiliateAddress, {
            gas: gas + 80000,
            value: this._web3.toWei(5, 'finney')
         	}, (err, result) => {
                this.web3message.called = true;
                this.web3message.calledFrom = 'openLootbox';
                if(err){this.web3message.error = err;}
                if(result){this.web3message.result = result;}
        });
      }else{
        console.log(err);
      }
     });    
  }


  ///@notice Gets champ at certain position
  ///@param _position Champ's positon
  public async getChampAtPosition(_position:number): Promise<number> {
	  return new Promise((resolve, reject) => {
	    this._tokenContract.leaderboard.call(_position - 1, function (err, result) {
	      if(err != null) {
	        reject(err);
	      }
	      resolve(+result);
	    });
	  }) as Promise<number>;
  }


  ///@notice Gets champ's ID and return owner's ethereum address
  ///@param _id Champ's id
  ///@returns Owner's address
  public async champToOwner(_id:number): Promise<string> {
	  return new Promise((resolve, reject) => {
	    this._tokenContract.champToOwner.call(_id, function (err, result) {
	      if(err != null) {
	        reject(err);
	      }
	      resolve(result);
	    });
	  }) as Promise<string>;
  }


  ///@notice Gets champ's name
  ///@param _id Champ's id
  ///@returns Name
  public async getChampsName(_id:number): Promise<string> {
    return new Promise((resolve, reject) => {
      this._tokenContract.champToName.call(_id, function (err, result) {
        if(err != null) {
          reject(err);
        }
        if(result.trim() == ""){
          result = "Champ " + _id;
        }else{
          result = result.substring(0, 13);
        }
        resolve(result);
      });
    }) as Promise<string>;
  }


  ///@notice Gets item's ID and return owner's ethereum address
  ///@param _id Item's id
  ///@returns Owner's address
  public async itemToOwner(_id:number): Promise<string> {
    return new Promise((resolve, reject) => {
      this._tokenContract.itemToOwner.call(_id, function (err, result) {
        if(err != null) {
          reject(err);
        }
        resolve(result);
      });
    }) as Promise<string>;
  }


  ///@notice Checks if address is owner of champ
  ///@param _champId Champ's ID
  ///@param _address Address to check with
  ///@returns false or true
  public async isOwnerOfChamp(_champId:number,_address:string): Promise<boolean> {
  	let address = (_address) ? _address : await this.getAccount();
	  let owner = await this.champToOwner(_champId);
	  let isOwner = (address == owner) ? true : false;
	  return isOwner;
  }


  ///@notice Checks if address is owner of item
  ///@param _champId Item's ID
  ///@param _address Address to check with
  ///@returns false or true
  public async isOwnerOfItem(_itemId:number,_address:string): Promise<boolean> {
    let address = (_address) ? _address : await this.getAccount();
    let owner = await this.itemToOwner(_itemId);
    let isOwner = (address == owner) ? true : false;
    return isOwner;
  }


  ///@dev Gets IDs of champs for sale
  public async getChampsForSale(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._tokenContract.getChampsForSale.call(function (err, result) {
        if(err != null) {
          reject(err);
        }
        resolve(result);
      });
    }) as Promise<any>;
  }


  ///@dev Gets IDs of items for sale
  public async getItemsForSale(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._tokenContract.getItemsForSale.call(function (err, result) {
        if(err != null) {
          reject(err);
        }
        resolve(result);
      });
    }) as Promise<any>;
  }


  ///@notice Gets champs attack power WITH ITEMS ON
  ///@param _id Champ's ID
  ///@returns Number
  public async getChampAttackPower(_id:number): Promise<number> {
    return new Promise((resolve, reject) => {
      this._tokenContract.getChampStats.call(_id, function (err, result) {
        if(err != null) {
          reject(err);
        }
        resolve(+result[0]);
      });
    }) as Promise<number>;
  }


  ///@notice Gets champs defence power WITH ITEMS ON
  ///@param _id Champ's ID
  ///@returns Number
  public async getChampDefencePower(_id:number): Promise<number> {
    return new Promise((resolve, reject) => {
      this._tokenContract.getChampStats.call(_id, function (err, result) {
        if(err != null) {
          reject(err);
        }
        resolve(+result[1]);
      });
    }) as Promise<number>;
  }


  ///@notice Gets champs total cooldown reduction
  ///@param _id Champ's ID
  ///@returns Number
  public async getChampCooldownReduction(_id:number): Promise<number> {
    return new Promise((resolve, reject) => {
      this._tokenContract.getChampStats.call(_id, function (err, result) {
        if(err != null) {
          reject(err);
        }
        resolve(+result[2]);
      });
    }) as Promise<number>;
  }


  ///@dev Sends request to move champ's reward to address pendings (if posible)
  ///@dev Can be called also if cooldown havenot passed
  public withdrawChamp(_champId:number){
    this._tokenContract.withdrawChamp.estimateGas(_champId, {from: this._account}, (err, gas) => {
      if(err == null){
      	this._tokenContract.withdrawChamp(_champId, {
            gas: gas
         	}, (err, result) => {
                this.web3message.called = true;
                this.web3message.calledFrom = 'withdrawChamp';
                if(err){this.web3message.error = err;}
                if(result){this.web3message.result = result;}
        });
      }else{
        console.log(err);
      }
     });
  }


  ///@notice Sets champ for sale
  ///@param _price Has to be in WEI
  public setChampForSale(_champId:number,_price:number) {
    let price = this._web3.toWei(_price, 'ether');
    this._tokenContract.setChampForSale.estimateGas(_champId, price, {from: this._account}, (err, gas) => {
      if(err == null){
      	this._tokenContract.setChampForSale(_champId, price, {
            gas: gas
         	}, (err, result) => {
            this.web3message.called = true;
            this.web3message.calledFrom = 'setChampForSale';
            if(err){this.web3message.error = err;}
            if(result){this.web3message.result = result;}
        });
      }else{
        console.log(err);
      }
     });
  }


  ///@notice Gift champ
  public giveChamp(_toAddress:string,_champId:number){
    this._tokenContract.giveChamp.estimateGas(_toAddress, _champId, {from: this._account}, (err, gas) => {
      if(err == null){
         this._tokenContract.giveChamp(_toAddress, _champId, {
            gas: gas
          }, (err, result) => {
            this.web3message.called = true;
            this.web3message.calledFrom = 'giveChamp';
            if(err){this.web3message.error = err;}
            if(result){this.web3message.result = result;}
          });
      }else{
        console.log(err);
      }
     });
  }


  ///@notie Attack champ
  public attack(_champId:number,_targetId:number){
    this._tokenContract.attack.estimateGas(_champId, _targetId, {from: this._account}, (err, gas) => {
      if(err == null){
      	this._tokenContract.attack(_champId, _targetId, {
            gas: gas
         	}, (err, result) => {
                this.web3message.called = true;
                this.web3message.calledFrom = 'attack';
                if(err){this.web3message.error = err;}
                if(result){this.web3message.result = result;}
        });
      }else{
        console.log(err);
      }
     });
  }


  ///@notice Buy champ
  ///@param _price Has to be in WEI
  public buyChamp(_champId:number,_price:number){
    this._tokenContract.buyChamp.estimateGas(_champId, {from: this._account, value: _price}, (err, gas) => {
      if(err == null){
      	this._tokenContract.buyChamp(_champId, {
            gas: gas,
            value: _price
         	}, (err, result) => {
                this.web3message.called = true;
                this.web3message.calledFrom = 'buyChamp';
                if(err){this.web3message.error = err;}
                if(result){this.web3message.result = result;}
        });
      }else{
        console.log(err);
      }
     });
  }


  ///@notice Puts on item
  public putOnItem(_itemId:number,_champId:number){
    this._tokenContract.putOn.estimateGas(_champId, _itemId, {from: this._account}, (err, gas) => {
      if(err == null){
        this._tokenContract.putOn(_champId, _itemId, {
            gas: gas
          }, (err, result) => {
                this.web3message.called = true;
                this.web3message.calledFrom = 'putOnItem';
                if(err){this.web3message.error = err;}
                if(result){this.web3message.result = result;}
        });
      }else{
        console.log(err);
      }
     });
  }


  ///@notice Sets item for sale
  ///@param _price Has to be in ETHER! 
  ///@dev Price converts in this functon from ether from wei
  public setItemForSale(_itemId:number,_price:number){
    let price = this._web3.toWei(_price, 'ether');
    this._tokenContract.setItemForSale.estimateGas(_itemId, price, {from: this._account}, (err, gas) => {
      if(err == null){
        this._tokenContract.setItemForSale(_itemId, price, {
            gas: gas
          }, (err, result) => {
                this.web3message.called = true;
                this.web3message.calledFrom = 'setItemForSale';
                if(err){this.web3message.error = err;}
                if(result){this.web3message.result = result;}
        });
      }else{
        console.log(err);
      }
     });
  }


  ///@notice Send item as gift
  public giveItem(_toAddress:string,_itemId:number){
    this._tokenContract.giveItem.estimateGas(_toAddress, _itemId, {from: this._account}, (err, gas) => {
      if(err == null){
        this._tokenContract.giveItem(_toAddress, _itemId, {
            gas: gas
          }, (err, result) => {
            this.web3message.called = true;
            this.web3message.calledFrom = 'giveItem';
            if(err){this.web3message.error = err;}
            if(result){this.web3message.result = result;}
        });
      }else{
        console.log(err);
      }
    });
  }


  ///@notice Buys item from market
  ///@param _price Has to be in WEI
  public buyItem(_itemId:number,_price:number){
    this._tokenContract.buyItem.estimateGas(_itemId, {from: this._account, value: _price}, (err, gas) => {
      if(err == null){
        this._tokenContract.buyItem(_itemId, {
            gas: gas,
            value: _price
          }, (err, result) => {
                this.web3message.called = true;
                this.web3message.calledFrom = 'buyItem';
                if(err){this.web3message.error = err;}
                if(result){this.web3message.result = result;}
        });
      }else{
        console.log(err);
      }
    });
  }


  ///@notice Cancels champ's sale
  public cancelChampSale(_champId:number){
    this._tokenContract.cancelChampSale.estimateGas(_champId, {from: this._account}, (err, gas) => {
      if(err == null){
        this._tokenContract.cancelChampSale(_champId, {
          gas: gas
          }, (err, result) => {
            this.web3message.called = true;
            this.web3message.calledFrom = 'cancelChampSale';
            if(err){this.web3message.error = err;}
            if(result){this.web3message.result = result;}
        });
      }else{
        console.log(err);
      }
    });
  }


  ///@notice Cancels item's sale
  public cancelItemSale(_itemId:number){
    this._tokenContract.cancelItemSale.estimateGas(_itemId, {from: this._account}, (err, gas) => {
      if(err == null){
        this._tokenContract.cancelItemSale(_itemId, {
            gas: gas
          }, (err, result) => {
            this.web3message.called = true;
            this.web3message.calledFrom = 'cancelItemSale';
            if(err){this.web3message.error = err;}
            if(result){this.web3message.result = result;}
        });
      }else{
        console.log(err);
      }
    });
  }


  ///@notice A lot of update subscribe functions down here
  public updateMyChampsCount(newNumber: number) {
    this.myChampsCountSource.next(newNumber)
  }

  ///@notice Update subscribe function
  public updateMyItemsCount(newNumber: number) {
    this.myItemsCountSource.next(newNumber)
  }

  ///@notice Update subscribe function
  public updateMyWithdrawalPending(newNumber: number) {
    this.myWithdrawalPendingSource.next(newNumber)
  }

  ///@notice Update subscribe function
  public updateMyChamps(newChamps: any) {
    this.myChampsSource.next(newChamps)
  }

  ///@notice Update subscribe function
  public updateMyItems(newItems: any) {
    this.myItemsSource.next(newItems)
  }

  ///@notice Update subscribe function
  public updateChampsForSale(newChamps: any) {
    this.champsForSaleSource.next(newChamps)
  }

  ///@notice Update subscribe function
  public updateSwordsForSale(newItems: any) {
    this.swordsForSaleSource.next(newItems)
  }

  ///@notice Update subscribe function
  public updateShieldsForSale(newItems: any) {
    this.shieldsForSaleSource.next(newItems)
  }

  ///@notice Update subscribe function
  public updateHelmetsForSale(newItems: any) {
    this.helmetsForSaleSource.next(newItems)
  }

  ///@notice Update subscribe function
   public updateAddressChampsCount(newNumber: number) {
    this.addressChampsCountSource.next(newNumber)
  }

  ///@notice Update subscribe function
  public updateAddressItemsCount(newNumber: number) {
    this.addressItemsCountSource.next(newNumber)
  }

  ///@notice Update subscribe function
   public updateAddressChamps(newChamps: any) {
    this.addressChampsSource.next(newChamps)
  }

  ///@notice Update subscribe function
  public updateAddressItems(newItems: any) {
    this.addressItemsSource.next(newItems)
  }

  ///@notice Update subscribe function
  public updateBlockTimestamp(newTimestamp: number) {
    this.blockTimestampSource.next(newTimestamp)
  }

  ///@notice Update subscribe function
  public updateMyAddressName(newName: string) {
    this.myAddressNameSource.next(newName)
  }


  ///@notice Reloads champs
  ///@dev Update new champs in subscribe 
  ///@dev Don't update champ's stats (forSale, attackPower, etc.), just in case new is created is added into this array
  public reloadMyChamps(){
    this.getChampsByOwner(null).then(res => { 
    this._myChampsIDs = res;
    for(let i = 0; i < this._myChampsIDs.length; i++){
        let champ:any;
        this.getChamp(this._myChampsIDs[i]).then(res => { 
            champ = res; 
            if(this._myChamps.findIndex(x => x.id==champ.id) === -1){
              this._myChamps.push(champ);
            }else{
              if(JSON.stringify(champ) !== JSON.stringify(this._myChamps[this._myChamps.findIndex(x => x.id==champ.id)])){ 
                this._myChamps[this._myChamps.findIndex(x => x.id==champ.id)] = champ;
              }
            }
        });  
      }  

      //Deletes if was gifted
      for(let i = 0; i < this._myChamps.length; i++){
        if(this._myChampsIDs.findIndex(id => id==this._myChamps[i].id) === -1){
          this._myChamps.splice(i, 1);
          i = 0;
        }
      }

      this.updateMyChamps(this._myChamps); 
    });
  }


  ///@notice Reloads items
  ///@dev Update new items in subscribe 
  ///@dev Doesn't update item's stats (forSale, attackPower, etc.), just in case new is created is added into this array
  public reloadMyItems(){
    this.getItemsByOwner(null).then(res => { 
    this._myItemsIDs = res;
    for(let i = 0; i < this._myItemsIDs.length; i++){
        let item:any;
        this.getItem(this._myItemsIDs[i]).then(res => { 
            item = res; 
            if(this._myItems.findIndex(x => x.id==item.id) === -1){
              this._myItems.push(item);
            }else{
              if(JSON.stringify(item) !== JSON.stringify(this._myItems[this._myItems.findIndex(x => x.id==item.id)])){
                this._myItems[this._myItems.findIndex(x => x.id==item.id)] = item;
              }
            }
        });  
      }  

      //Deletes if was gifted
      for(let i = 0; i < this._myItems.length; i++){
        if(this._myItemsIDs.findIndex(id => id==this._myItems[i].id) === -1){
          this._myItems.splice(i, 1);
          i = 0;
        }
      }

      this.updateMyItems(this._myItems); 
    });
  }


  ///@dev Update new champs for sale in subscribe 
  ///@dev Doesn't update stats if they are already in array
  public reloadChampsForSale(){
    this.getChampsForSale().then(res => { 
    this._champsForSaleIDs = res;
    for(let i = 0; i < this._champsForSaleIDs.length; i++){
        this.champsNothingToSale = false;
        let champ:any;
        this.getChamp(this._champsForSaleIDs[i]).then(res => { 
            champ = res; 
            if(this._champsForSale.findIndex(x => x.id==champ.id) === -1){
              this._champsForSale.push(champ);
            }else{
              if(JSON.stringify(champ) !== JSON.stringify(this._champsForSale[this._champsForSale.findIndex(x => x.id==champ.id)])){
                this._champsForSale[this._champsForSale.findIndex(x => x.id==champ.id)] = champ;
              }
            }
        });  
      }  

      //Deletes if was sold
      for(let i = 0; i < this._champsForSale.length; i++){
        if(this._champsForSaleIDs.findIndex(id => id==this._champsForSale[i].id) === -1){
          this._champsForSale.splice(i, 1);
          i = 0;
        }
      }

      this.updateChampsForSale(this._champsForSale); 
    });
  }


  ///@dev Update new items for sale in subscribe 
  ///@dev Doesn't update stats if they are already in array
  public reloadItemsForSale(){
    this.getItemsForSale().then(res => { 
    this._itemsForSaleIDs = res;
    for(let i = 0; i < this._itemsForSaleIDs.length; i++){
        let item:any;
        this.getItem(this._itemsForSaleIDs[i]).then(res => { 
            item = res; 

            if(item.type=="sword"){
              this.swordsNothingToSale = false;
              if(this._swordsForSale.findIndex(x => x.id==item.id) === -1){
                this._swordsForSale.push(item);
              }else{
                if(JSON.stringify(item) !== JSON.stringify(this._swordsForSale[this._swordsForSale.findIndex(x => x.id==item.id)])){
                  this._swordsForSale[this._swordsForSale.findIndex(x => x.id==item.id)] = item;
                }
              }

              //Deletes if was sold
              for(let i = 0; i < this._swordsForSale.length; i++){
                if(this._itemsForSaleIDs.findIndex(id => id==this._swordsForSale[i].id) === -1){
                  this._swordsForSale.splice(i, 1);
                  i = 0;
                }
              }

            }

            if(item.type=="shield"){
              this.shieldsNothingToSale = false;
              if(this._shieldsForSale.findIndex(x => x.id==item.id) === -1){
                this._shieldsForSale.push(item);
              }else{
                if(JSON.stringify(item) !== JSON.stringify(this._shieldsForSale[this._shieldsForSale.findIndex(x => x.id==item.id)])){
                  this._shieldsForSale[this._shieldsForSale.findIndex(x => x.id==item.id)] = item;
                }
              }

              //Deletes if was sold
              for(let i = 0; i < this._shieldsForSale.length; i++){
                if(this._itemsForSaleIDs.findIndex(id => id==this._shieldsForSale[i].id) === -1){
                  this._shieldsForSale.splice(i, 1);
                  i = 0;
                }
              }

            }

            if(item.type=="helmet"){
              this.helmetsNothingToSale = false;
              if(this._helmetsForSale.findIndex(x => x.id==item.id) === -1){
                this._helmetsForSale.push(item);
              }else{
                if(JSON.stringify(item) !== JSON.stringify(this._helmetsForSale[this._helmetsForSale.findIndex(x => x.id==item.id)])){
                  this._helmetsForSale[this._helmetsForSale.findIndex(x => x.id==item.id)] = item;
                }
              }

              //Deletes if was sold
              for(let i = 0; i < this._helmetsForSale.length; i++){
                if(this._itemsForSaleIDs.findIndex(id => id==this._helmetsForSale[i].id) === -1){
                  this._helmetsForSale.splice(i, 1);
                  i = 0;
                }
              }

            }

        });  
      }  

      this.updateSwordsForSale(this._swordsForSale); 
      this.updateShieldsForSale(this._shieldsForSale); 
      this.updateHelmetsForSale(this._helmetsForSale); 
    });
  }


  ///@notice Reloads champs by address
  ///@dev Used when checking other player (address) portfolio
  ///@dev In my portfolio is being used function reloadMyChamps()
  public reloadAddressChamps(_address:string){
    this.getChampsByOwner(_address).then(res => { 
    this._addressChampsIDs = res;
    for(let i = 0; i < this._addressChampsIDs.length; i++){
        let champ:any;
        this.getChamp(this._addressChampsIDs[i]).then(res => { 
            champ = res; 
            if(this._addressChamps.findIndex(x => x.id==champ.id) === -1){
              this._addressChamps.push(champ);
            }else{
              if(JSON.stringify(champ) !== JSON.stringify(this._addressChamps[this._addressChamps.findIndex(x => x.id==champ.id)])){
                this._addressChamps[this._addressChamps.findIndex(x => x.id==champ.id)] = champ;
              }
            }
        });  
      }  

      //Deletes if was gifted
      for(let i = 0; i < this._addressChamps.length; i++){
        if(this._addressChampsIDs.findIndex(id => id==this._addressChamps[i].id) === -1){
          this._addressChamps.splice(i, 1);
          i = 0;
        }
      }

      this.updateAddressChamps(this._addressChamps); 
    });
  }


  ///@notice Reloads items by address
  ///@dev Used when checking other player (address) portfolio
  ///@dev In my portfolio is being used function reloadMyItems()
  public reloadAddressItems(_address:string){
    this.getItemsByOwner(_address).then(res => { 
    this._addressItemsIDs = res;
    for(let i = 0; i < this._addressItemsIDs.length; i++){
        let item:any;
        this.getItem(this._addressItemsIDs[i]).then(res => { 
            item = res; 
            if(this._addressItems.findIndex(x => x.id==item.id) === -1){
              this._addressItems.push(item);
            }else{
              if(JSON.stringify(item) !== JSON.stringify(this._addressItems[this._addressItems.findIndex(x => x.id==item.id)])){
                this._addressItems[this._addressItems.findIndex(x => x.id==item.id)] = item;
              }
            }
        });  
      }  

      //Deletes if was gifted
      for(let i = 0; i < this._addressItems.length; i++){
        if(this._addressItemsIDs.findIndex(id => id==this._addressItems[i].id) === -1){
          this._addressItems.splice(i, 1);
          i = 0;
        }
      }

      this.updateAddressItems(this._addressItems); 
    });
  }


  ///@notice Sends pending funds to address
  ///@param _address Check&send pending funds on this address
  public async withdrawalFunds(_address:string){
    let address = (_address) ? _address : await this.getAccount();
    this._tokenContract.withdrawToAddress.estimateGas(address, {from: this._account}, (err, gas) => {
      if(err == null){
        this._tokenContract.withdrawToAddress(address, {
            gas: gas
          }, (err, result) => {
            this.web3message.called = true;
            this.web3message.calledFrom = 'withdrawalFunds';
            if(err){this.web3message.error = err;}
            if(result){this.web3message.result = result;}
        });
      }else{
        console.log(err);
      }
    });
  }

  ///@dev Nulls web3message. Usually after modal is opened
  public nullWeb3Message(){
    this.web3message = {'called': false, 'error':null, 'result':null, 'calledFrom':null};
  }


  ///@notice Gets champs img
  ///@dev Modulus (25) is max count + 1 of avaiable images for champs. 
  public getChampImg(_champID:number){
    let imgNum = _champID % 25;
    return 'champ' + imgNum + '.png';
  }


  ///@notice Gets swords img
  private getSwordImg(_itemID:number, _itemRank:string){
    let commonCount = 7;
    let uncommonCount = 4;
    let rareCount = 4;
    let epicCount = 3;
    let legendaryCount = 4;

    let imgNum = 0;
    if(_itemRank == 'common'){
      imgNum = _itemID % commonCount;
    }

    if(_itemRank == 'uncommon'){
      imgNum = _itemID % uncommonCount;
    }

    if(_itemRank == 'rare'){
      imgNum = _itemID % rareCount;
    }

    if(_itemRank == 'epic'){
      imgNum = _itemID % epicCount;
    }

    if(_itemRank == 'legendary'){
      imgNum = _itemID % legendaryCount;
    }
    
    return 'swords/' + _itemRank + '/sword' + imgNum + '.png';
  }


  ///@notice Gets shield img
  private getShieldImg(_itemID:number, _itemRank:string){
    let commonCount = 4;
    let uncommonCount = 6;
    let rareCount = 5;
    let epicCount = 5;
    let legendaryCount = 6;

    let imgNum = 0;
    if(_itemRank == 'common'){
      imgNum = _itemID % commonCount;
    }

    if(_itemRank == 'uncommon'){
      imgNum = _itemID % uncommonCount;
    }

    if(_itemRank == 'rare'){
      imgNum = _itemID % rareCount;
    }

    if(_itemRank == 'epic'){
      imgNum = _itemID % epicCount;
    }

    if(_itemRank == 'legendary'){
      imgNum = _itemID % legendaryCount;
    }

    return 'shields/' + _itemRank + '/shield' + imgNum + '.png';
  }


  ///@notice Gets helmet img
  private getHelmetImg(_itemID:number, _itemRank:string){
    let commonCount = 9;
    let uncommonCount = 6;
    let rareCount = 5;
    let epicCount = 7;
    let legendaryCount = 5;

    let imgNum = 0;
    if(_itemRank == 'common'){
      imgNum = _itemID % commonCount;
    }

    if(_itemRank == 'uncommon'){
      imgNum = _itemID % uncommonCount;
    }

    if(_itemRank == 'rare'){
      imgNum = _itemID % rareCount;
    }

    if(_itemRank == 'epic'){
      imgNum = _itemID % epicCount;
    }

    if(_itemRank == 'legendary'){
      imgNum = _itemID % legendaryCount;
    }
    
    return 'helmets/' + _itemRank + '/helmet' + imgNum + '.png';
  }

  ///@dev Decide what function will be called to get item img based on type
  public getItemImg(_itemID:number, _itemType:string, _itemRank:string){
    if(_itemType == "sword"){
      return this.getSwordImg(_itemID, _itemRank);
    }
    if(_itemType == "shield"){
      return this.getShieldImg(_itemID, _itemRank);
    }
    if(_itemType == "helmet"){
      return this.getHelmetImg(_itemID, _itemRank);
    }
  }

  ///@notice Gets no-gradient bg color
  public getBackgroundColor(_id:number){
    let backgroundColorNum = (_id % 14) + 1;
    return 'background-color-' + backgroundColorNum;
  }


  ///@notice Gets gradient bg color
  public getBackgroundGradientColor(_id:number){
    let backgroundColorNum = (_id % 14) + 1;
    return 'background-gradient-color-' + backgroundColorNum;
  }


  ///@notice Change champ's name
  public changeChampsName(_champId:number, _name:string){
    this._tokenContract.changeChampsName.estimateGas(_champId, _name, {from: this._account}, (err, gas) => {
      if(err == null){
        this._tokenContract.changeChampsName(_champId, _name, {
            gas: gas
          }, (err, result) => {
            this.web3message.called = true;
            this.web3message.calledFrom = 'changeChampsName';
            if(err){this.web3message.error = err;}
            if(result){this.web3message.result = result;}
        });
      }else{
        console.log(err);
      }
    });
  }


  ///@notice Change address's name
  public changePlayersName(_name:string){
    this._tokenContract.changePlayersName.estimateGas(_name, {from: this._account}, (err, gas) => {
      if(err == null){
        this._tokenContract.changePlayersName(_name, {
            gas: gas
          }, (err, result) => {
                this.web3message.called = true;
                this.web3message.calledFrom = 'changePlayersName';
                if(err){this.web3message.error = err;}
                if(result){this.web3message.result = result;}
        });
      }else{
        console.log(err);
      }
    });
  }


  ///@notice Change address's name
  public forgeItems(_parentItemID, _childItemID){
    this._tokenContract.forgeItems.estimateGas(_parentItemID, _childItemID, {from: this._account}, (err, gas) => {
      if(err == null){
        this._tokenContract.forgeItems(_parentItemID, _childItemID, {
            gas: gas
          }, (err, result) => {
                this.web3message.called = true;
                this.web3message.calledFrom = 'forgeItems';
                if(err){this.web3message.error = err;}
                if(result){this.web3message.result = result;}
        });
      }else{
        console.log(err);
      }
    });
  }


  ///@notice Puts on item
  public takeOffItem(_champId:number,_itemType:number){
    this._tokenContract.takeOffItem.estimateGas(_champId, _itemType, {from: this._account}, (err, gas) => {
      if(err == null){
        this._tokenContract.takeOffItem(_champId, _itemType, {
            gas: gas
          }, (err, result) => {
            this.web3message.called = true;
            this.web3message.calledFrom = 'takeOffItem';
            if(err){this.web3message.error = err;}
            if(result){this.web3message.result = result;}
        });
      }else{
        console.log(err);
      }
    });
  }


  //@notice Convert time to "16h 20m" format - used in champ page
  public timeConvert(n:number) {
    let num = n / 60;
    let hours = (num / 60);
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    return rhours + "h " + rminutes + "m";
   }

   //@notice Convert time to "16h" format - used almost everywhere else than champ page
   public timeConvertWithoutMinutes(n:number) {
    let num = n / 60;
    let hours = (num / 60);
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    if(minutes > 29){
      rhours++;
    }
    return rhours + "h";
   }

   //@notice Convert time to "16h" format - used almost everywhere else than champ page
   public timeConvertInAttack(n:number) {
    let num = n / 60;
    let hours = (num / 60);
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    if(minutes > 0){
      rhours++;
    }
    return rhours + "h";
   }

  ///@notice Gets champ's reward
  ///@param _id Champ's id
  ///@returns Name
  public async getChampReward(_id:number): Promise<number> {
    return new Promise((resolve, reject) => {
      this._tokenContract.getChampReward.call(_id, function (err, result) {
        if(err != null) {
          reject(err);
        }

        resolve(result);
      });
    }) as Promise<number>;
  }

}
