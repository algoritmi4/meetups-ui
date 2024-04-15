
export interface IReviewer {
    id: number; // ID of the reviewer
    username: string; // Username of the reviewer
    image_url: string; // Image URL of the reviewer
}

export interface IReview {
    id: number; // ID of the review
    rating: number; // Rating given in the review
    created_by: IReviewer;
    created_at: string; // Date-time when the review was created
    review: string; // Text content of the review
}
