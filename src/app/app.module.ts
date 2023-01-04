import { BrowserModule } from '@angular/platform-browser';
//import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule  } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TopicsComponent } from './topics/topics.component';
import { ProfileComponent } from './profile/profile.component';
import { DonationComponent } from './donation/donation.component';
import { PostsComponent } from './posts/posts.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgxUiLoaderModule } from "ngx-ui-loader";
import { PanchangaComponent } from './panchanga/panchanga.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopicsComponent,
    ProfileComponent,
    DonationComponent,
    PostsComponent,
    PanchangaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxUiLoaderModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'topics', component: TopicsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'donation', component: DonationComponent },
      { path: 'posts', component: PostsComponent },
      { path: 'panchanga', component: PanchangaComponent }
    ])
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent],
  //schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
