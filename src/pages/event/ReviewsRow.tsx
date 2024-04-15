import { IEvent } from "@/entities/event/model/types";
import { useGetReviewsQuery } from "@/entities/review/api/reviewApi";
import { ReviewSlider } from "@/features/review";
import { ReactElement } from "react";

interface IReviewsRow {
    eventId: number;
    rating: string | null;
}

export function ReviewsRow({eventId, rating}: IReviewsRow): ReactElement {
    
    const {data: reviews, error, isLoading} = useGetReviewsQuery(eventId);
    
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        if ('status' in error) {
            // you can access all properties of `FetchBaseQueryError` here
            const errMsg = 'error' in error ? error.error : JSON.stringify(error.data)

            return (
                <div>
                    <div>An error has occurred:</div>
                    <div>{errMsg}</div>
                </div>
            )
        } else {
            // you can access all properties of `SerializedError` here
            return <div>{error.message}</div>
        }
    }

    return (
        <div className="">
            <div className="text-neutral-800 text-[28px] mb-[25px] font-bold">
            Отзывы
            </div>
            <div className="rating flex font-bold text-[18px] mb-[20px]">
                <div>Рейтинг: {rating} </div>
                <div
                 className='w-[24px] h-[24px] ml-[5px] bg-center bg-no-repeat'
                 style={{ backgroundImage: `url("/images/star.svg")` }}></div>
            </div>

            {reviews && reviews?.results.length > 0 ? (
                <ReviewSlider reviews={reviews.results}></ReviewSlider>
            ) : (
                <div>No reviews yet.</div>
            )}
        </div>
    )
}
