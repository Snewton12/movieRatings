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
}

export enum Genre {
    Action = 1,
    Comedy,
    Drama,
    SciFi
}