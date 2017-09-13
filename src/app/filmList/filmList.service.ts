import { Injectable } from "@angular/core";
import * as firebase from 'firebase/app'
import { Film, Review, SortValue } from '../interfaces';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FilmListService {
    movies: Film[];
    constructor(public auth: AngularFireAuth, public db: AngularFireDatabase) {
        this.loadFilms();
    }

    loadFilms() : Observable<Film[]>{
        return new Observable(observer => {
            if (this.movies) {
                observer.next(this.movies);
                return observer.complete();
            }
            const observableList = this.db.list('movies');
            observableList.subscribe((result) => {
                this.movies = Object.keys(result).map(key => result[key]);
                this.movies.forEach(this.populateReviewsArray);
                observer.next(this.movies);
                observer.complete();
            });
        });
    }

    populateReviewsArray(movie: Film) {
        movie.reviews = new Array<Review>();
        let sumRating = 0;
        let counter = 0;
        for (let property in movie) {
            if (movie[property].hasOwnProperty('reviews')) {
                movie.reviews.push(movie[property].reviews);
                sumRating += movie[property].reviews["rating"]
                counter++;
            }
        }
        movie.averageRating = counter === 0 ? 0 : sumRating/counter;
    }

    sortList(sortValue: number) {
        switch(sortValue) {
            case SortValue.Title: {
                this.movies.sort((f1, f2) => +(f1.title > f2.title));
                break;
            }
            case SortValue.Genre: {
                this.movies.sort((f1, f2) => +(f1.genre["id"] > f2.genre["id"]));
                break;
            }
            case SortValue.AverageRating: {
                this.movies.sort((f1, f2) => +(f1.averageRating > f2.averageRating));
                break;
            }
        }
    }

    saveFilm(film: Film) {
        let storageRef = firebase.storage().ref();
        storageRef.child(`assets/${film.artImageTitle}`).putString(film.artImage.substring(23), 'base64')
            .then((snapshot) => {
                let url = snapshot.metadata.downloadURLs[0];
                let dbRef = firebase.database().ref('movies/');
                let newFilm = dbRef.push();
                newFilm.set({
                    title: film.title,
                    genre: film.genre,
                    artImageTitle: film.artImageTitle,
                    artImage: url,
                    id: newFilm.key,
                    reviews: film.reviews
                });
                alert('Success!');
            })
            .catch((error) => {
                alert(`failed: ${error}`);
            });
    }

    saveReview(reviewMovieTitle: string, reviewToAdd: Review) {
        let moviedbRef: Film;
        let dbRef = firebase.database().ref('movies/')
            .orderByChild('title')
            .equalTo(reviewMovieTitle);
        dbRef.once("child_added").then((snapshot) => {
            snapshot.ref.push().set({ reviews: reviewToAdd });
            alert("Success adding review!");
        }).catch((error) => {
            alert(`failed: ${error}`);
        });
    }
}