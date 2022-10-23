import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TopicsComponent } from './topics/topics.component';
import { ProfileComponent } from './profile/profile.component';
import { DonationComponent } from './donation/donation.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopicsComponent,
    ProfileComponent,
    DonationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'topics', component: TopicsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'donation', component: DonationComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
