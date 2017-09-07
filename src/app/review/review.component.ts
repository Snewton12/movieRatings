import { Component, Input } from '@angular/core';
import { Review } from '../interfaces';

@Component({
    selector: "review",
    templateUrl: "./review.component.html"
})
export class ReviewComponent{
    @Input() review: Review;
}