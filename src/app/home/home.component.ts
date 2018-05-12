import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../game.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  myChampsCount: number;
  myItemsCount: number;

  constructor(private cookieService: CookieService, private route: ActivatedRoute, private router: Router, public game: GameService) { }

  ngOnInit() {
  	this.route.params.subscribe(result => { 
  		if(result.ref){
  			this.cookieService.set('affiliateAddress', result.ref, new Date(new Date().getTime() + 365 * 1000 * 60 * 60 * 24), '/');
  			this.router.navigate([''])
  		}
  	});
  
  }

}
