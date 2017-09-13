import { Component, OnInit } from "@angular/core";
import { Genre, Film, Review } from "../interfaces";
import { FilmComponent } from "./../film/film.component";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import * as firebase from 'firebase/app'
import 'firebase/storage'
import { FilmListService } from "../filmList/filmList.service";

@Component({
    selector: 'addReview',
    templateUrl: './addReview.component.html',
    styleUrls: ['./addReview.component.css']
})
export class AddReviewComponent implements OnInit {
    firebase: any;
    isFilmEditMode: boolean = false;
    artImage: string = "";
    artImageTitle: string = "";
    title: string = "";
    genres: any[] = [
        { id: Genre.Action, name: "Action" },
        { id: Genre.Comedy, name: "Comedy" },
        { id: Genre.Drama, name: "Drama" },
        { id: Genre.SciFi, name: "SciFi" }
    ];
    selectedGenre: number = 1;
    movies: Film[];
    reviewMovieTitle: string;

    constructor(public db: AngularFireDatabase, private filmListService: FilmListService) {
        this.loadFilms();
    }

    ngOnInit() {

    }

    loadFilms() {
        this.filmListService.loadFilms().subscribe(movies => this.movies = movies);
    }

    sortList(sortValue: number) {
        this.filmListService.sortList(sortValue);
    }

    addNewFilm() {
        this.isFilmEditMode = true;
    }

    fileLoad($event: any) {
        let myReader: FileReader = new FileReader();
        let file: File = $event.target.files[0];
        this.artImageTitle = file.name;
        myReader.readAsDataURL(file);
        myReader.onload = (e: any) => {
            this.artImage = e.target.result;
        }
    }

    saveFilm() {
        let film: Film = {
            artImage: this.artImage,
            artImageTitle: this.artImageTitle,
            genre: this.selectedGenre,
            title: this.title,
            reviews: new Array<Review>(),
            averageRating: 0
        }
        this.filmListService.saveFilm(film);
    }
}