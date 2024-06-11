import { CalendarCard } from "@/shared/ui/CalendarCard";
import { SlickSlider } from "@/shared/ui/SlickSlider/SlickSlider";
import { ICardProps } from "@/shared/types";
import { generateCalendarDays } from "../lib/generateCalendarDays";
import { currentMonth, settings, generateDateFormat } from "../model/constants";
import { useAppSelector, useAppDispatch } from "@/shared/model";
import {
  startDateSetted,
  endDateSetted,
  startDateGTESetted,
} from "@/features/searchFilter/model/SearchFilterSlice";

export function DateSlider() {
  const dateArr = generateCalendarDays(40);
  const dispatch = useAppDispatch();
  const { startDate, endDate, startDateGTE } = useAppSelector(
    (state) => state.searchFilter
  );

  const onHandleCloseCalendarFilter = () => {
    dispatch(startDateSetted(""));
    dispatch(endDateSetted(""));
    dispatch(startDateGTESetted(""));
  };

  const onHandleClickDate = (date: ICardProps) => {
    if (startDate === "") {
      dispatch(startDateSetted(generateDateFormat(date)));
    }
    if (startDate != "" && generateDateFormat(date) > startDate) {
      dispatch(startDateSetted(""));
      dispatch(startDateGTESetted(startDate));
      dispatch(endDateSetted(generateDateFormat(date)));
    }
    if (
      generateDateFormat(date) <= startDate ||
      generateDateFormat(date) <= startDateGTE
    ) {
      onHandleCloseCalendarFilter();
    }
  };

  const cards = dateArr.map((el: ICardProps, index: number) => (
    <CalendarCard
      key={index}
      date={el}
      isStartDate={
        startDate === generateDateFormat(el) ||
        startDateGTE === generateDateFormat(el)
      }
      isEndDate={endDate === generateDateFormat(el)}
      isBetweenDate={
        generateDateFormat(el) < endDate &&
        generateDateFormat(el) > startDateGTE
      }
      onClickDate={onHandleClickDate}
    />
  ));

  return (
    <div className="flex flex-col relative before:w-[165px] before:absolute before:right-[-5px] before:h-full before:bg-slider-fade-out before:z-10 mt-[46px]">
      <h3 className="capitalize text-[20px] font-normal text-text-black">
        {currentMonth}
      </h3>
      <SlickSlider
        extraSettings={settings}
        arrowsExtraClasses={{
          rightArrow: "right-[-12px] top-1/2 translate-y-[-50%]",
          leftArrow: "left-[-42px] top-1/2 translate-y-[-50%]",
        }}
      >
        {cards}
      </SlickSlider>
    </div>
  );
}
