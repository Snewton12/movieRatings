export class Review {
    rating: number;
    review: string;
    reviewerName: string;
}

export class Film {
    artImage: string;
    artImageTitle: string;
    title: string;
    genre: Genre;
    reviews: Review[];
    averageRating: number;
}

export enum Genre {
    Action = 1,
    Comedy,
    Drama,
    SciFi
}

export enum SortValue {
    Title = 1,
    Genre = 2,
    AverageRating = 3
}