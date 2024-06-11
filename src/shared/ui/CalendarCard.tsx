import {ReactElement} from "react";
import {ICardProps} from "../types";

interface ICalendarCard {
  date: ICardProps;
  isStartDate: boolean;
  isEndDate: boolean;
  isBetweenDate: boolean;
  onClickDate: (date: ICardProps) =>  void;
}


export function CalendarCard({ date, isStartDate, isEndDate, isBetweenDate, onClickDate }: ICalendarCard): ReactElement {

  return (
    <div className={`flex flex-col mr-8 shrink-0 max-w-[27px] cursor-pointer ${isStartDate || isEndDate ? ' bg-gray' : '' } ${isBetweenDate ? 'bg-black' : ''}`} onClick = {() => onClickDate(date)}>
      <p className="text-[22px] font-semibold text-text-black text-center">{date.date}</p>
      <p className={`text-[13px] font-medium mt-2 text-text-black text-center uppercase ${date.weekDay === "СБ" || date.weekDay === "ВС" ? "text-text-red" : ""}`}>{date.weekDay}</p>
    </div>
  );
}
