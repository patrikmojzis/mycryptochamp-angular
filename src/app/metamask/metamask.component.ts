import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameService } from '../game.service';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-metamask',
  templateUrl: './metamask.component.html',
  styleUrls: ['./metamask.component.css', '../header/header.component.css']
})
export class MetamaskComponent implements OnInit, OnDestroy {

  private _onDestroy = new Subject();
  public isMobile = false;
  public isTrustWalletCompatible = false;

  constructor(public game: GameService, private router: Router, private deviceService: DeviceDetectorService) { }

  ngOnInit() {
  	Observable.interval(2000).takeUntil(this._onDestroy).subscribe(x => {
      	this.game.getAccount().then(res => { 
      		if (res != 'undefined'){
      			this.game.MetaMaskError = 0; 
      		} 
      	});	
    });

    this.detectMob();
  }

  detectMob() { 
    let navigator = this.deviceService.getDeviceInfo();
    
    if( navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
    ){
      this.isMobile =  true;

      //is trust wallet compatible?
      if( navigator.userAgent.match(/Android/i)
       || navigator.userAgent.match(/iPhone/i)
       || navigator.userAgent.match(/iPad/i)
       || navigator.userAgent.match(/iPod/i)
      ){
          this.isTrustWalletCompatible =  true;
        }
        else {
          this.isTrustWalletCompatible = false;
        }

    }else {
      this.isMobile = false;
    }
  }

  ngOnDestroy() {
    this._onDestroy.next();
  }

}
