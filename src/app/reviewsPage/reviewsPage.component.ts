import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { FilmListService } from '../filmList/filmList.service';
import * as firebase from 'firebase/app'
import 'firebase/storage'
import { Film, Review } from '../interfaces';

@Component({
    selector: 'reviewsPage',
    templateUrl: './reviewsPage.component.html'
})
export class ReviewsPageComponent implements OnInit {
    movies: Film[];

    constructor(public auth: AngularFireAuth, public db: AngularFireDatabase, private filmListService: FilmListService) {
        this.loadFilms();
    }

    ngOnInit() {

    }

    loadFilms() {
        let dbRef = firebase.database().ref('movies/');
        dbRef.once('value')
            .then((snapshot) => {
                let tmp: string[] = snapshot.val();
                this.movies = Object.keys(tmp).map(key => tmp[key])
                this.movies.forEach(this.populateReviewsArray);
            });
    }

    populateReviewsArray(movie: Film) {
        movie.reviews = new Array<Review>();
        for (let property in movie) {
            if (movie[property].hasOwnProperty('reviews'))
                movie.reviews.push(movie[property].reviews);
        }
    }
}