import { ReactElement } from "react";
import { IReview } from "../model/types";
import { Link } from "react-router-dom";

export interface IReviewCard {
  review: IReview;
}

export function ReviewCard({ review }: IReviewCard): ReactElement {

const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating / 2);
    const halfStar = (rating / 2 % 1) >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    return (
        <>
            {Array(fullStars).fill(<div
                 className='w-[24px] h-[24px] mr-[6px] bg-center bg-no-repeat'
                 style={{ backgroundImage: `url("/images/star.svg")` }}></div>)}
            {halfStar > 0 && <div
                 className='w-[24px] h-[24px] mr-[6px] bg-center bg-no-repeat'
                 style={{ backgroundImage: `url("/images/star-half.svg")` }}></div>}
            {Array(emptyStars).fill(<div
                 className='w-[24px] h-[24px] mr-[6px] bg-center bg-no-repeat'
                 style={{ backgroundImage: `url("/images/star-empty.svg")` }}></div>)}
        </>
    );
};

  return (
    <div className="review-card h-[255px] w-[375px] bg-comment rounded-[10px] px-[24px] py-[19px]">
        <div className="header mb-[17px]">
            <div className="text-[18px] font-bold mb-[5px]">{review.created_by.username}</div>
            <div className="flex">
                {renderStars(review.rating)}
            </div>
        </div>
        <img src={review.created_by.image_url} alt="Profile Picture" className="profile-pic h-[60px] w-[60px] rounded-full"/>
        
        <div className="review-text relative">
            <div className="text-lg  whitespace-pre-wrap truncate ... max-h-[115px] font-light text-neutral-600">{review.review}</div>
        </div>
        <div className="footer absolute bottom-[20px]">
            <div className="text-xs text-neutral-400">{new Date(review.created_at).toLocaleDateString()}</div>
        </div>
    </div>
  )
}
