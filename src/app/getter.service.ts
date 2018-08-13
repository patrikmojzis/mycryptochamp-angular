import { Injectable } from '@angular/core';

@Injectable()
export class GetterService {

  constructor() { } 

  ///@dev It's result[3] from addressInfo map
  public async getAddressName(_tokenContract:any, _account:string): Promise<string> {
    return new Promise((resolve, reject) => {
      _tokenContract.addressInfo.call(_account, function (err, result) {
        if(err != null) {
          reject(err);
        }

        if(result[3].trim() == ""){
          if(_account != null){
            result[3] = _account.substring(2, 8).toUpperCase();
          }
        }else{
          result[3] = result[3].substring(0, 13);
        }

        //heaven :))
        if(result[3] == "000000"){
          result[3] = "Heaven";
        }

        //heaven :))
        if(result[3] == "689FB6"){
          result[3] = "MyCryptoChamp";
        }

        resolve(result[3]);
      });
    }) as Promise<string>;
  }


  ///@dev It's result[0] from addressInfo map
  public async getWithdrawalPending(_tokenContract:any, _account:string): Promise<number> {
	  return new Promise((resolve, reject) => {
	    _tokenContract.addressInfo.call(_account, function (err, result) {
	      if(err != null) {
	        reject(err);
	      }

	      resolve(+result[0]);
	    });
	  }) as Promise<number>;
  }


  ///@notice Gets champs by owner
  ///@param _account User address
  ///@returns array of champs IDs
  public async getChampsByOwner(_tokenContract:any, _account:string): Promise<any> {
	  return new Promise((resolve, reject) => {
	    _tokenContract.getChampsByOwner.call(_account, function (err, result) {
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
  public async getItemsByOwner(_tokenContract:any, _account:string): Promise<any> {
	  return new Promise((resolve, reject) => {
	    _tokenContract.getItemsByOwner.call(_account, function (err, result) {
	      if(err != null) {
	        reject(err);
	      }

	      resolve(result);
	    });
	  }) as Promise<any>;
  }


  ///@notice Gets champ's ID and return owner's ethereum address
  ///@param _id Champ's id
  ///@returns Owner's address
  public async champToOwner(_tokenContract:any, _id:number): Promise<string> {
	  return new Promise((resolve, reject) => {
	    _tokenContract.tokenToOwner.call(true, _id, function (err, result) {
	      if(err != null) {
	        reject(err);
	      }
	      resolve(result);
	    });
	  }) as Promise<string>;
  }

  //@returns Returs booleans if address is owner or approved of token
  public async onlyApprovedOrOwnerOfToken(_tokenContract:any,_tokenId:number,_address:string,_isTokenChamp:boolean): Promise<boolean> {
    return new Promise((resolve, reject) => {
      _tokenContract.onlyApprovedOrOwnerOfToken.call(_tokenId,_address,_isTokenChamp, function (err, result) {
        if(err != null) {
          reject(err);
        }
        resolve(result);
      });
    }) as Promise<boolean>;
  }


  ///@notice Gets champs attack power WITH ITEMS ON
  ///@param _id Champ's ID
  ///@returns Number
  public async getChampAttackPower(_tokenContract:any,_id:number): Promise<number> {
    return new Promise((resolve, reject) => {
      _tokenContract.getChampStats.call(_id, function (err, result) {
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
  public async getChampDefencePower(_tokenContract:any,_id:number): Promise<number> {
    return new Promise((resolve, reject) => {
      _tokenContract.getChampStats.call(_id, function (err, result) {
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
  public async getChampCooldownReduction(_tokenContract:any,_id:number): Promise<number> {
    return new Promise((resolve, reject) => {
      _tokenContract.getChampStats.call(_id, function (err, result) {
        if(err != null) {
          reject(err);
        }
        resolve(+result[2]);
      });
    }) as Promise<number>;
  }


  ///@notice Gets champ's name
  ///@param _id Champ's id
  ///@returns Name
  public async getChampsName(_tokenContract:any,_id:number): Promise<string> {
    return new Promise((resolve, reject) => {
      _tokenContract.champToName.call(_id, function (err, result) {
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


  ///@notice Gets champs informations
  ///@param _id Champ's id
  public async getChamp(_tokenContract:any,_id:number): Promise<any> {

    let owner = await this.champToOwner(_tokenContract,_id);
    let ownerName = await this.getAddressName(_tokenContract,owner);
    let attackPower = await this.getChampAttackPower(_tokenContract,_id);
    let defencePower = await this.getChampDefencePower(_tokenContract,_id);
    let cooldownReduction = await this.getChampCooldownReduction(_tokenContract,_id);
    let name = await this.getChampsName(_tokenContract,_id);
    
	return new Promise((resolve, reject) => {
	    _tokenContract.champs.call(_id, function (err, result) {
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
			   	'eq_helmet': +result[12], 
			   	'forSale': result[13],
		      'owner': owner,
		      'name': name,
		      'ownerName': ownerName
		    });

	    });
	  }) as Promise<any>;
  }


  ///@notice Gets item's ID and return owner's ethereum address
  ///@param _id Item's id
  ///@returns Owner's address
  public async itemToOwner(_tokenContract:any,_id:number): Promise<string> {
    return new Promise((resolve, reject) => {
      _tokenContract.tokenToOwner.call(false, _id, function (err, result) {
        if(err != null) {
          reject(err);
        }
        resolve(result);
      });
    }) as Promise<string>;
  }


  ///@notice Gets item informations
  ///@param _id Item's id
  public async getItem(_tokenContract:any,_id:number): Promise<any> {
    let owner = await this.itemToOwner(_tokenContract,_id);
    let ownerName = await this.getAddressName(_tokenContract,owner);

	return new Promise((resolve, reject) => {
	    _tokenContract.items.call(_id, function (err, result) {
	    	if(err != null) {
	        	reject(err);
	      	}

	        let type = "empty";
	        let rank = "common";

	        if(result[1] == 1){
	          type = "sword";
	        }

	        if(result[1] == 2){
	          type = "shield";
	        }

	        if(result[1] == 3){
	          type = "helmet";
	        }


	        if(result[2] == 1){
	          rank = "common";
	        }

	        if(result[2] == 2){
	          rank = "uncommon";
	        }

	        if(result[2] == 3){
	          rank = "rare";
	        }

	        if(result[2] == 4){
	          rank = "epic";
	        }

	        if(result[2] == 5){
	          rank = "legendary";
	        }

	        if(result[2] == 6){
	          rank = "forged";
	        }

		    resolve({
	       'id': +_id,
		     'type': type, 
	       'rank': rank, 
		     'attackPower': +result[3], 
		     'defencePower': +result[4], 
		     'cooldownReduction': +result[5], 
		     'price': +result[6] / 1000000000000000000, 
		     'onChampID': +result[7],
	       'onChamp': result[8], 
		     'forSale': result[9],
	       'owner': owner,
	       'ownerName': ownerName
		    });

	    });
	  }) as Promise<any>;
  }


  ///@notice Gets champ at certain position
  ///@param _position Champ's positon
  public async getChampAtPosition(_tokenContract:any,_position:number): Promise<number> {
	  return new Promise((resolve, reject) => {
	    _tokenContract.leaderboard.call(_position, function (err, result) {
	      if(err != null) {
	        reject(err);
	      }
	      resolve(+result);
	    });
	  }) as Promise<number>;
  }


  ///@notice Gets champs count
  ///@dev It's result[1] from addressInfo map
  ///@param _account User address
  public async getChampsCount(_tokenContract:any,_account:string): Promise<number> {
	  return new Promise((resolve, reject) => {
      if(_tokenContract == undefined){
        reject('Err');
      }
	    _tokenContract.addressInfo.call(_account, function (err, result) {
	      if(err != null) {
	        reject(err);
	      }
	      resolve(+result[1]);
	    });
	  }) as Promise<number>;
  }


  ///@notice Gets items count
  ///@dev It's result[2] from addressInfo map
  ///@param _account User address
  public async getItemsCount(_tokenContract:any,_account:string): Promise<number> {
	  return new Promise((resolve, reject) => {
	    _tokenContract.addressInfo.call(_account, function (err, result) {
	      if(err != null) {
	        reject(err);
	      }
	      resolve(+result[2]);
	    });
	  }) as Promise<number>;
  }  


  ///@notice Gets TOTAL champs count
  ///@dev Use in leadeboard
  public async getTotalChampsCount(_tokenContract:any): Promise<number> {
    return new Promise((resolve, reject) => {
      _tokenContract.getTokenCount.call(true, function (err, result) {
        if(err != null) {
          reject(err);
        }
        resolve(+result);
      });
    }) as Promise<number>;
  }


  ///@dev Gets IDs of champs for sale
  public async getChampsForSale(_tokenContract:any): Promise<any> {
    return new Promise((resolve, reject) => {
      _tokenContract.getTokensForSale.call(true, function (err, result) {
        if(err != null) {
          reject(err);
        }
        resolve(result);
      });
    }) as Promise<any>;
  }


  ///@dev Gets IDs of items for sale
  public async getItemsForSale(_tokenContract:any): Promise<any> {
    return new Promise((resolve, reject) => {
      _tokenContract.getTokensForSale.call(false, function (err, result) {
        if(err != null) {
          reject(err);
        }
        resolve(result);
      });
    }) as Promise<any>;
  }


  ///@notice Gets champs img
  ///@dev Modulus (25) is max count + 1 of avaiable images for champs. 
  public getChampImg(_champID:number){
    let imgNum = _champID % 25;
    return 'champ' + imgNum + '.png';
  }


  ///@notice Gets swords img
  public getSwordImg(_itemID:number, _itemRank:string){
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
  public getShieldImg(_itemID:number, _itemRank:string){
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
  public getHelmetImg(_itemID:number, _itemRank:string){
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


  ///@notice Gets champ's reward
  ///@param _id Champ's id
  ///@returns Reward
  public async getChampReward(_tokenContract:any, _id:number): Promise<number> {
    return new Promise((resolve, reject) => {
      _tokenContract.getChampReward.call(_id, function (err, result) {
        if(err != null) {
          reject(err);
        }

        resolve(result);
      });
    }) as Promise<number>;
  }

  public getBgColorHEX(_class:string){
    switch(_class) { 
      case "background-color-1": {
        return "#d3e8ff";
      }
      case "background-color-2": {
        return "#ffe0e5";
      }
      case "background-color-3": {
        return "#eee9e8";
      }
      case "background-color-4": {
        return "#d1eeeb";
      }
      case "background-color-5": {
        return "#faf4cf";
      }
      case "background-color-6": {
        return "#cdf5d4";
      }
      case "background-color-7": {
        return "#dfdffa";
      }
      case "background-color-8": {
        return "#c1c1ea";
      }
      case "background-color-9": {
        return "#efe1da";
      }
      case "background-color-10": {
        return "#efbaba";
      }
      case "background-color-11": {
        return "#fde9e4";
      }
      case "background-color-12": {
        return "#ede2f5";
      }
      case "background-color-13": {
        return "#dcebfc";
      }
      case "background-color-14": {
        return "#a2c2eb";
      }
      default: { 
        return "#d3e8ff";
     } 
    }
  }



}
