import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ChampComponent } from './champ/champ.component';
import { ItemComponent } from './item/item.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { MarketComponent } from './market/market.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ProfileComponent } from './profile/profile.component';
import { InviteComponent } from './invite/invite.component';
import { TransactionComponent } from './transaction/transaction.component';
import { MetamaskComponent } from './metamask/metamask.component';
import { ForgeComponent } from './forge/forge.component';
import { FaqComponent } from './faq/faq.component';
import { TechComponent } from './tech/tech.component';
import { ApiComponent } from './api/api.component';


const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'invitation/:ref', component: HomeComponent, pathMatch: 'full' },
	{ path: 'champ/:id', component: ChampComponent, pathMatch: 'full' },
	{ path: 'leaderboard', component: LeaderboardComponent },
	{ path: 'market/:category', component: MarketComponent, pathMatch: 'full' },
	{ path: 'portfolio', component: PortfolioComponent },
	{ path: 'item/:id', component: ItemComponent, pathMatch: 'full' },
	{ path: 'profile/:address', component: ProfileComponent, pathMatch: 'full' },
	{ path: 'invite', component: InviteComponent },
	{ path: 'transaction-sent', component: TransactionComponent },
	{ path: 'metamask', component: MetamaskComponent },
	{ path: 'forge', component: ForgeComponent },
	{ path: 'faq', component: FaqComponent },
	{ path: 'tech', component: TechComponent },
	{ path: 'api/:v/:type', component: ApiComponent },
	{ path: 'api/:v/:type/:id', component: ApiComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
