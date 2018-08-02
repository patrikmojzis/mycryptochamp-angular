import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { GetterService } from './getter.service';

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
  
  private _abi:any = [{"constant":false,"inputs":[{"name":"_address","type":"address"}],"name":"loadController","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"},{"name":"_isTokenChamp","type":"bool"}],"name":"cancelTokenSale","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"},{"name":"_to","type":"address"},{"name":"_isTokenChamp","type":"bool"}],"name":"setTokenApproval","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_champId","type":"uint256"},{"name":"_attackPower","type":"uint256"},{"name":"_defencePower","type":"uint256"},{"name":"_cooldownTime","type":"uint256"},{"name":"_readyTime","type":"uint256"},{"name":"_winCount","type":"uint256"},{"name":"_lossCount","type":"uint256"},{"name":"_position","type":"uint256"},{"name":"_price","type":"uint256"},{"name":"_withdrawCooldown","type":"uint256"},{"name":"_eq_sword","type":"uint256"},{"name":"_eq_shield","type":"uint256"},{"name":"_eq_helmet","type":"uint256"},{"name":"_forSale","type":"bool"}],"name":"updateChamp","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"addressInfo","outputs":[{"name":"withdrawal","type":"uint256"},{"name":"champsCount","type":"uint256"},{"name":"itemsCount","type":"uint256"},{"name":"name","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_tokenId","type":"uint256"},{"name":"_isTokenChamp","type":"bool"}],"name":"clearTokenApproval","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"getItemsByOwner","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"},{"name":"_price","type":"uint256"},{"name":"_isTokenChamp","type":"bool"}],"name":"setTokenForSale","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"}],"name":"withdrawChamp","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_attackPower","type":"uint256"},{"name":"_defencePower","type":"uint256"},{"name":"_cooldownTime","type":"uint256"},{"name":"_winCount","type":"uint256"},{"name":"_lossCount","type":"uint256"},{"name":"_position","type":"uint256"},{"name":"_price","type":"uint256"},{"name":"_eq_sword","type":"uint256"},{"name":"_eq_shield","type":"uint256"},{"name":"_eq_helmet","type":"uint256"},{"name":"_forSale","type":"bool"},{"name":"_owner","type":"address"}],"name":"newChamp","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_parentItemID","type":"uint256"},{"name":"_childItemID","type":"uint256"}],"name":"forgeItems","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_champId","type":"uint256"}],"name":"getChampStats","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_champId","type":"uint256"},{"name":"_itemId","type":"uint256"}],"name":"putOn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_champId","type":"uint256"},{"name":"_name","type":"string"}],"name":"setChampsName","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bool"},{"name":"","type":"address"},{"name":"","type":"address"}],"name":"tokenOperatorApprovals","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bool"},{"name":"","type":"uint256"}],"name":"tokenApprovals","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"string"}],"name":"changePlayersName","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_champId","type":"uint256"},{"name":"_isTokenChamp","type":"bool"}],"name":"giveToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"},{"name":"_itemType","type":"uint8"},{"name":"_itemRarity","type":"uint8"},{"name":"_attackPower","type":"uint256"},{"name":"_defencePower","type":"uint256"},{"name":"_cooldownReduction","type":"uint256"},{"name":"_price","type":"uint256"},{"name":"_onChampId","type":"uint256"},{"name":"_onChamp","type":"bool"},{"name":"_forSale","type":"bool"}],"name":"updateItem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"champToName","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"},{"name":"_affiliateAddress","type":"address"}],"name":"buyItem","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"_isTokenChamp","type":"bool"}],"name":"getTokenCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"pendingWithdrawal","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_id","type":"uint256"},{"name":"_isTokenChamp","type":"bool"}],"name":"transferToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"},{"name":"_withdrawal","type":"uint256"},{"name":"_updatePendingWithdrawal","type":"bool"},{"name":"_champsCount","type":"uint256"},{"name":"_updateChampsCount","type":"bool"},{"name":"_itemsCount","type":"uint256"},{"name":"_updateItemsCount","type":"bool"},{"name":"_name","type":"string"},{"name":"_updateName","type":"bool"}],"name":"updateAddressInfo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"},{"name":"_isTokenChamp","type":"bool"}],"name":"setTokensForSaleCount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_isTokenChamp","type":"bool"}],"name":"getTokensForSale","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_position","type":"uint256"}],"name":"getChampReward","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_itemType","type":"uint8"},{"name":"_itemRarity","type":"uint8"},{"name":"_attackPower","type":"uint256"},{"name":"_defencePower","type":"uint256"},{"name":"_cooldownReduction","type":"uint256"},{"name":"_price","type":"uint256"},{"name":"_onChampId","type":"uint256"},{"name":"_onChamp","type":"bool"},{"name":"_forSale","type":"bool"},{"name":"_owner","type":"address"}],"name":"newItem","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"}],"name":"withdrawToAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bool"}],"name":"tokensForSaleCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bool"},{"name":"","type":"uint256"}],"name":"tokenToOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_champId","type":"uint256"},{"name":"_name","type":"string"}],"name":"changeChampsName","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_x","type":"uint256"},{"name":"_value","type":"uint256"}],"name":"setLeaderboard","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"leaderboard","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"items","outputs":[{"name":"id","type":"uint256"},{"name":"itemType","type":"uint8"},{"name":"itemRarity","type":"uint8"},{"name":"attackPower","type":"uint256"},{"name":"defencePower","type":"uint256"},{"name":"cooldownReduction","type":"uint256"},{"name":"price","type":"uint256"},{"name":"onChampId","type":"uint256"},{"name":"onChamp","type":"bool"},{"name":"forSale","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"champs","outputs":[{"name":"id","type":"uint256"},{"name":"attackPower","type":"uint256"},{"name":"defencePower","type":"uint256"},{"name":"cooldownTime","type":"uint256"},{"name":"readyTime","type":"uint256"},{"name":"winCount","type":"uint256"},{"name":"lossCount","type":"uint256"},{"name":"position","type":"uint256"},{"name":"price","type":"uint256"},{"name":"withdrawCooldown","type":"uint256"},{"name":"eq_sword","type":"uint256"},{"name":"eq_shield","type":"uint256"},{"name":"eq_helmet","type":"uint256"},{"name":"forSale","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_id","type":"uint256"},{"name":"_msgsender","type":"address"},{"name":"_isTokenChamp","type":"bool"}],"name":"onlyApprovedOrOwnerOfToken","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"},{"name":"_amount","type":"uint256"}],"name":"addWithdrawal","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"emergencyWithdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_champId","type":"uint256"},{"name":"_type","type":"uint8"}],"name":"takeOffItem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"},{"name":"_affiliateAddress","type":"address"}],"name":"buyChamp","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_approved","type":"bool"},{"name":"_isTokenChamp","type":"bool"}],"name":"setTokenOperatorApprovals","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"},{"name":"_isTokenChamp","type":"bool"}],"name":"getTokenURIs","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_champId","type":"uint256"},{"name":"_targetId","type":"uint256"}],"name":"attack","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"},{"name":"_owner","type":"address"},{"name":"_isTokenChamp","type":"bool"}],"name":"setTokenToOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"getChampsByOwner","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"},{"name":"_trusted","type":"bool"}],"name":"setTrusted","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];
  public _tokenContract: any;
  private _tokenContractAddress: string = "0x689fb61845488297dfe7586e5f7956475955d2dc"; 

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
 constructor(private _getter: GetterService) {
    //checks for WEB3
    if (typeof window.web3 !== 'undefined') {
      // Use Mist/MetaMask's provider
      this._web3 = new Web3(window.web3.currentProvider);

      this._web3.version.getNetwork((err, network) => {
        if (network !== '1') {
          //console.warn('Please connect to the Mainnet network');
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


  /*
   *
       UPDATE FUNCTIONS
   *
   */
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



  /*
   *
       GETTERS
   *
   */

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


  ///@notice Gets champs count
  ///@dev It's result[1] from addressInfo map
  ///@param _account User address
  public async getChampsCount(_account:string): Promise<number> {
	  let account = (_account) ? _account : await this.getAccount();
	  return await this._getter.getChampsCount(this._tokenContract, account);
  }


  ///@notice Gets withdrawal pendings
  ///@param _account User address
  public async getWithdrawalPending(_account:string): Promise<number> {
	  let account = (_account) ? _account : await this.getAccount();
    return await this._getter.getWithdrawalPending(this._tokenContract, account);
  }


  ///@notice Gets items count
  ///@dev It's result[2] from addressInfo map
  ///@param _account User address
  public async getItemsCount(_account:string): Promise<number> {
	  let account = (_account) ? _account : await this.getAccount();
    return await this._getter.getItemsCount(this._tokenContract, account);
  }


  ///@notice Gets address name
  ///@param _account Player's name
  public async getAddressName(_account:string): Promise<string> {
    let account = (_account) ? _account : await this.getAccount();
    return await this._getter.getAddressName(this._tokenContract, account);
  }


  ///@notice Gets TOTAL champs count
  ///@dev Use in leadeboard
  public async getTotalChampsCount(): Promise<number> {
    return await this._getter.getTotalChampsCount(this._tokenContract);
  }

  ///@notice Gets champs by owner
  ///@param _account User address
  ///@returns array of champs IDs
  public async getChampsByOwner(_account:string): Promise<any> {
	  let account = (_account) ? _account : await this.getAccount();
    return await this._getter.getChampsByOwner(this._tokenContract, account);
  }


  ///@notice Gets items by owner
  ///@param _account User address
  ///@returns array of IDs
  public async getItemsByOwner(_account:string): Promise<any> {
	  let account = (_account) ? _account : await this.getAccount();
    return await this._getter.getItemsByOwner(this._tokenContract, account);
  }

  ///@notice Gets champs informations
  ///@param _id Champ's id
  public async getChamp(_id:number): Promise<any> {
    return this._getter.getChamp(this._tokenContract, _id)
  }

  ///@notice Gets item informations
  ///@param _id Item's id
  public async getItem(_id:number): Promise<any> {
    return await this._getter.getItem(this._tokenContract, _id);
  }


  ///@notice Gets champ at certain position
  ///@param _position Champ's positon
  public async getChampAtPosition(_position:number): Promise<number> {
	  return await this._getter.getChampAtPosition(this._tokenContract, _position);
  }


  ///@notice Gets champ's ID and return owner's ethereum address
  ///@param _id Champ's id
  ///@returns Owner's address
  public async champToOwner(_id:number): Promise<string> {
	  return await this._getter.champToOwner(this._tokenContract, _id);
  }

  //@returns Returs booleans if address is owner or approved of token
  public async onlyApprovedOrOwnerOfToken(_tokenId:number,_address:string,_isTokenChamp:boolean): Promise<boolean> {
    return await this._getter.onlyApprovedOrOwnerOfToken(this._tokenContract,_tokenId, _address, _isTokenChamp);
  }


  ///@notice Gets champ's name
  ///@param _id Champ's id
  ///@returns Name
  public async getChampsName(_id:number): Promise<string> {
    return await this._getter.getChampsName(this._tokenContract, _id);
  }


  ///@notice Gets item's ID and return owner's ethereum address
  ///@param _id Item's id
  ///@returns Owner's address
  public async itemToOwner(_id:number): Promise<string> {
    return await this._getter.itemToOwner(this._tokenContract, _id);
  }


  ///@notice Checks if address is owner of champ
  ///@param _champId Champ's ID
  ///@param _address Address to check with
  ///@returns false or true
  public async isOwnerOfChamp(_champId:number,_address:string): Promise<boolean> {
  	let address = (_address) ? _address : await this.getAccount();
	  /*
    let owner = await this.champToOwner(_champId);
	  let isOwner = (address == owner) ? true : false;
	  return isOwner;
    */
    let isApproved = await this.onlyApprovedOrOwnerOfToken(_champId,address,true);
    return isApproved;
  }


  ///@notice Checks if address is owner of item
  ///@param _champId Item's ID
  ///@param _address Address to check with
  ///@returns false or true
  public async isOwnerOfItem(_itemId:number,_address:string): Promise<boolean> {
    let address = (_address) ? _address : await this.getAccount();
    /*
    let owner = await this.itemToOwner(_itemId);
    let isOwner = (address == owner) ? true : false;
    return isOwner;
    */
    let isApproved = await this.onlyApprovedOrOwnerOfToken(_itemId,address,false);
    return isApproved;
  }


  ///@dev Gets IDs of champs for sale
  public async getChampsForSale(): Promise<any> {
    return await this._getter.getChampsForSale(this._tokenContract);
  }


  ///@dev Gets IDs of items for sale
  public async getItemsForSale(): Promise<any> {
    return await this._getter.getItemsForSale(this._tokenContract);
  }


  ///@notice Gets champs attack power WITH ITEMS ON
  ///@param _id Champ's ID
  ///@returns Number
  public async getChampAttackPower(_id:number): Promise<number> {
    return await this._getter.getChampAttackPower(this._tokenContract,_id);
  }


  ///@notice Gets champs defence power WITH ITEMS ON
  ///@param _id Champ's ID
  ///@returns Number
  public async getChampDefencePower(_id:number): Promise<number> {
    return await this._getter.getChampDefencePower(this._tokenContract,_id);
  }


  ///@notice Gets champs total cooldown reduction
  ///@param _id Champ's ID
  ///@returns Number
  public async getChampCooldownReduction(_id:number): Promise<number> {
    return await this._getter.getChampCooldownReduction(this._tokenContract,_id);
  }

  ///@notice Gets champs img
  ///@dev Modulus (25) is max count + 1 of avaiable images for champs. 
  public getChampImg(_champID:number){
    return this._getter.getChampImg(_champID);
  }


  ///@notice Gets swords img
  private getSwordImg(_itemID:number, _itemRank:string){
    return this._getter.getSwordImg(_itemID, _itemRank);
  }


  ///@notice Gets shield img
  private getShieldImg(_itemID:number, _itemRank:string){
    return this._getter.getShieldImg(_itemID, _itemRank);
  }


  ///@notice Gets helmet img
  private getHelmetImg(_itemID:number, _itemRank:string){
    return this._getter.getHelmetImg(_itemID, _itemRank);
  }

  ///@dev Decide what function will be called to get item img based on type
  public getItemImg(_itemID:number, _itemType:string, _itemRank:string){
    return this._getter.getItemImg(_itemID, _itemType, _itemRank);
  }

  ///@notice Gets no-gradient bg color
  public getBackgroundColor(_id:number){
    return this._getter.getBackgroundColor(_id);
  }


  ///@notice Gets gradient bg color
  public getBackgroundGradientColor(_id:number){
    let backgroundColorNum = (_id % 14) + 1;
    return 'background-gradient-color-' + backgroundColorNum;
  }


  ///@notice Gets champ's reward
  ///@param _id Champ's id
  public async getChampReward(_id:number): Promise<number> {
    return await this._getter.getChampReward(this._tokenContract,_id);
  }



  /*
   *
       SETTERS
   *
   */
  ///@dev Sends request to move champ's reward to address pendings (if posible)
  ///@dev Can be called also if cooldown havenot passed
  public withdrawChamp(_champId:number){
    this._tokenContract.withdrawChamp.estimateGas(_champId, {from: this._account}, (err, gas) => {
      if(err == null){
      	this._tokenContract.withdrawChamp(_champId, {
            gas: gas + 3000
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
    this._tokenContract.setTokenForSale.estimateGas(_champId, price, true, {from: this._account}, (err, gas) => {
      if(err == null){
      	this._tokenContract.setTokenForSale(_champId, price, true, {
            gas: gas + 3000
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
    this._tokenContract.giveToken.estimateGas(_toAddress, _champId, true, {from: this._account}, (err, gas) => {
      if(err == null){
         this._tokenContract.giveToken(_toAddress, _champId, true, {
            gas: gas + 3000
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
            gas: gas + 50000
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
  public buyChamp(_champId:number,_price:number,_affiliateAddress:string){
    _affiliateAddress = (_affiliateAddress) ? _affiliateAddress : '0x0000000000000000000000000000000000000000';
    this._tokenContract.buyChamp.estimateGas(_champId, _affiliateAddress, {from: this._account, value: _price}, (err, gas) => {
      if(err == null){
      	this._tokenContract.buyChamp(_champId, _affiliateAddress, {
            gas: gas + 3000,
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
            gas: gas + 3000
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
    this._tokenContract.setTokenForSale.estimateGas(_itemId, price, false, {from: this._account}, (err, gas) => {
      if(err == null){
        this._tokenContract.setTokenForSale(_itemId, price, false, {
            gas: gas + 3000
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
    this._tokenContract.giveToken.estimateGas(_toAddress, _itemId, false, {from: this._account}, (err, gas) => {
      if(err == null){
        this._tokenContract.giveToken(_toAddress, _itemId, false, {
            gas: gas + 3000
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
  public buyItem(_itemId:number,_price:number,_affiliateAddress:string){
    _affiliateAddress = (_affiliateAddress) ? _affiliateAddress : '0x0000000000000000000000000000000000000000';
    this._tokenContract.buyItem.estimateGas(_itemId, _affiliateAddress, {from: this._account, value: _price}, (err, gas) => {
      if(err == null){
        this._tokenContract.buyItem(_itemId, _affiliateAddress, {
            gas: gas + 3000,
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
    this._tokenContract.cancelTokenSale.estimateGas(_champId, true, {from: this._account}, (err, gas) => {
      if(err == null){
        this._tokenContract.cancelTokenSale(_champId, true, {
          gas: gas + 3000
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
    this._tokenContract.cancelTokenSale.estimateGas(_itemId, false, {from: this._account}, (err, gas) => {
      if(err == null){
        this._tokenContract.cancelTokenSale(_itemId, false, {
            gas: gas + 3000
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
            gas: gas + 3000
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

  /*
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
  */

  /*
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
  */


  ///@notice Change champ's name
  public changeChampsName(_champId:number, _name:string){
    this._tokenContract.changeChampsName.estimateGas(_champId, _name, {from: this._account}, (err, gas) => {
      if(err == null){
        this._tokenContract.changeChampsName(_champId, _name, {
            gas: gas + 3000
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
            gas: gas + 3000
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
            gas: gas + 3000
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
            gas: gas + 3000
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



  /*
   *
       BASIC FUNCTIONS
   *
   */
  ///@dev Nulls web3message. Usually after modal is opened
  public nullWeb3Message(){
    this.web3message = {'called': false, 'error':null, 'result':null, 'calledFrom':null};
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


  ///@notice Reload block timestamp
  reloadBlockTimestamp(){
    this.getBlockTimestamp().then(res => { 
      this.updateBlockTimestamp(res);
    }); 
  }


  ///@notice Checks if user has changed account in metamask
  public checkIfAccountWasChanged(){
    this.getAccount().then(res => {
    if (this._web3.eth.accounts[0] !== this._account && this.MetaMaskError == 0){
      window.location.reload();
    }});
  }

}
