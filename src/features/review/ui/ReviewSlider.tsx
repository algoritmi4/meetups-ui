import { SlickSlider } from "@/shared";
import { ReactElement, useEffect, useState } from "react";
import { IReview } from "@/entities/review/model/types";
import { ReviewCard } from "@/entities/review/ui/ReviewCard";

interface IReviewSlider {
  reviews: IReview[];
}

export function ReviewSlider({ reviews }: IReviewSlider): ReactElement {
  const cards = reviews.map((el, index) => <ReviewCard key={index} review={el} />);

  const [width, setWidth] = useState(100);
  const [slidesToShow, setSlidesToShow] = useState(3);

  useEffect(() => {
    switch (reviews.length) {
      case 1:
        setWidth(33);
        setSlidesToShow(1);
        break
      case 2:
        setWidth(66);
        setSlidesToShow(2);
        break
      default:
        setWidth(103.7);
        setSlidesToShow(3);
    }
  }, [reviews.length]);

  const settings = {
    slidesToShow,
    slidesToScroll: 1,
    speed: 400,
    className: `mt-3 w-[${width}%] min-h-[285px]`
  }

  return (
    <SlickSlider extraSettings={settings} arrowsExtraClasses={{rightArrow: 'right-[-12px] top-[110px]', leftArrow: 'left-[-42px] top-[110px]'}}>
      {cards}
    </SlickSlider>
  )
}
