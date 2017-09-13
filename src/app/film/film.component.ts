import { Component, Input, OnInit } from '@angular/core';
import { Genre, Film, Review } from "../interfaces";
import { FilmListService } from '../filmList/filmList.service';
import { OnRatingChangeEven } from 'angular-star-rating';

@Component({
    selector: '[film]',
    templateUrl: './film.component.html',
    styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit{
    @Input() film: Film;
    @Input() showReviews: boolean;
    isReviewEditMode: boolean = false;
    reviewToAdd: Review;
    imagePath: string;
    ratingChangeResult: OnRatingChangeEven

    constructor(private filmListService: FilmListService) {
        
    }

    ngOnInit() {
        this.imagePath = "/assets/" + this.film.artImageTitle;
    }

    addNewReview(title: string) {
        this.isReviewEditMode = true;
        this.reviewToAdd = new Review();
    }

    saveReview() {
        this.filmListService.saveReview(this.film.title, this.reviewToAdd);
    }

    ratingChange = ($event:OnRatingChangeEven) => {
        this.reviewToAdd.rating = $event.rating;
    }
}