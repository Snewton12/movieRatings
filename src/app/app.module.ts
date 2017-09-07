import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { StarRatingModule } from 'angular-star-rating'

import { AppComponent } from './app.component';
import { NavbarComponent } from "./navbar/navbar.component";
import { HomeComponent } from "./home/home.component";
import { ErrorComponent } from './error/error.component';
import { FilmComponent } from "./film/film.component";
import { ReviewComponent } from "./review/review.component";
import { AddReviewComponent } from "./addReview/addReview.component";
import { FilmListService } from "./filmList/filmList.service";
import { ReviewsPageComponent } from "./reviewsPage/reviewsPage.component";

export const firebaseConfig = {
  apiKey: "AIzaSyBJmvQwh6pApVX0wBX1VBFr26cNU2T63W0",
  authDomain: "movieratings-3c411.firebaseapp.com",
  databaseURL: "https://movieratings-3c411.firebaseio.com",
  projectId: "movieratings-3c411",
  storageBucket: "movieratings-3c411.appspot.com",
  messagingSenderId: "697196698266"
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ErrorComponent,
    AddReviewComponent,
    ReviewsPageComponent,
    FilmComponent,
    ReviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    StarRatingModule.forRoot(),
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'reviews', component: ReviewsPageComponent },
      { path: 'addReview', component: AddReviewComponent },
      { path: '', component: HomeComponent },
      { path: '**', component: ErrorComponent }
    ])
  ],
  providers: [
    FilmListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
