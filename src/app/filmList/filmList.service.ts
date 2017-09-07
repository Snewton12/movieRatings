import { Injectable } from "@angular/core";
import * as firebase from 'firebase/app'
import { Film, Review } from '../interfaces';

@Injectable()
export class FilmListService {
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