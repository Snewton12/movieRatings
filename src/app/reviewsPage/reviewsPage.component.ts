import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { FilmListService } from '../filmList/filmList.service';
import * as firebase from 'firebase/app'
import 'firebase/storage'
import { Film, Review, SortValue } from '../interfaces';

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
        this.filmListService.loadFilms().subscribe(movies => this.movies = movies);
    }

    sortList(sortValue: number) {
        this.filmListService.sortList(sortValue);
    }
}