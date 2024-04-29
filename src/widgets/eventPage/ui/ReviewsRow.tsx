import { useGetReviewsQuery } from "@/entities/review/api/reviewApi";
import { ReviewSlider } from "@/features/review";
import Svg from "@/shared/ui/Svg";
import { ReactElement } from "react";

interface IReviewsRow {
  eventId: number;
  rating: number | null;
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
    <section className="w-full">
      <h2 className="text-text-black text-[28px] font-semibold mt-[92px]">
        Отзывы
      </h2>
      {
        rating ? (
          <div className="flex font-semibold text-[18px] mt-[25px]">
            <p>Рейтинг:</p>
            <Svg id="star" className="w-6 h-6"/>
          </div>
        ) : (
          <p className="">Нет рейтинга</p>
        )
      }

      {reviews && reviews?.results.length > 0 ? (
        <ReviewSlider reviews={reviews.results}></ReviewSlider>
      ) : (
        <div>No reviews yet.</div>
      )}
    </section>
  )
}
