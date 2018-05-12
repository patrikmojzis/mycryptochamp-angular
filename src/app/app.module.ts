import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { MarketComponent } from './market/market.component';
import { ChampComponent } from './champ/champ.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { GameService } from './game.service';
import { RankPipe } from './rank-filter.service';
import { EscapeHtmlPipe } from './rank-filter.service';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ItemComponent } from './item/item.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule } from '@angular/forms';
import { OrderModule } from 'ngx-order-pipe';
import { CookieService } from 'ngx-cookie-service';
import { ProfileComponent } from './profile/profile.component';
import { InviteComponent } from './invite/invite.component';
import { TransactionComponent } from './transaction/transaction.component';
import { MetamaskComponent } from './metamask/metamask.component';
import { ForgeComponent } from './forge/forge.component';
import { FaqComponent } from './faq/faq.component';
import { TechComponent } from './tech/tech.component';
import { Nw3headerComponent } from './nw3header/nw3header.component';
import { Nw3footerComponent } from './nw3footer/nw3footer.component';

@NgModule({
  declarations: [
    AppComponent,
    PortfolioComponent,
    LeaderboardComponent,
    MarketComponent,
    ChampComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ItemComponent,
    ProfileComponent,
    InviteComponent,
    TransactionComponent,
    MetamaskComponent,
    RankPipe,
    ForgeComponent,
    EscapeHtmlPipe,
    FaqComponent,
    TechComponent,
    Nw3headerComponent,
    Nw3footerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    AngularFontAwesomeModule,
    FormsModule,
    OrderModule
  ],
  providers: [GameService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
