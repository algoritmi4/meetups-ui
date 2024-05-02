import {ReactElement, useState} from "react";
import {IEvent} from "../model/types";
import { Link } from "react-router-dom";
import Svg from "@/shared/ui/Svg";
import { useLikeEventMutation, useUnlikeEventMutation } from "../api/eventApi";

export interface IEventCard {
  event: IEvent;
}

export function EventCard({ event }: IEventCard): ReactElement {
  const [isFavorite, setIsFavorite] = useState(event.is_favorite);

  const [likeEvent] = useLikeEventMutation();
  const [unlikeEvent] = useUnlikeEventMutation();

  const onLike = () => {
    setIsFavorite(true);

    likeEvent(event.id)
      .unwrap()
      .then(() => {return})
      .catch(() => setIsFavorite(false));
  }

  const onUnlike = () => {
    setIsFavorite(false);

    unlikeEvent(event.id)
      .unwrap()
      .then(() => {return})
      .catch(() => setIsFavorite(true));
  }

  return (
      <div className="w-full flex flex-col max-w-[270px] mr-[45px]">
          <div className="flex justify-between">
            <p className="text-[14px] font-medium capitalize">{event.category?.name}</p>
            <Svg
              id="heart-icon"
              className="w-6 h-6 cursor-pointer"
              onClick={isFavorite ? onUnlike : onLike}
              extraUseClass={isFavorite ? "!fill-but-primary stroke-but-primary" : "stroke-text-black"}
            />
          </div>
          <Link to={`/events/${event.id}`}>
            <figure className="group flex flex-col cursor-pointer rounded-12 max-h-[188px] mt-[7px] overflow-hidden">
                <img className="group-hover:scale-105 duration-300 ease-in-out rounded-t-def h-[143px] object-cover" src={`https://storage.googleapis.com/meetups-dev/media/${event.image_url}`} alt={`Изображение ивента ${event.name}`} />
                <div className={`h-[45px] bg-gray rounded-b-def flex items-center justify-center pl-[16px] pr-[7px] relative ${event.name.length > 21 && "before:w-[60px] before:rounded-b-[12px] before:absolute before:right-0 before:h-full before:bg-text-fade-out"}`}>
                    <figcaption className="group-hover:font-bold capitalize text-[20px] font-semibold text-text-black overflow-hidden whitespace-nowrap text-clip">{event.name}</figcaption>
                </div>
            </figure>
          </Link>
          <div className="flex justify-between mt-2.5">
            <div className="flex flex-col leading-def">
              <p className="text-[18px] font-medium">{new Date(event.start_date).toLocaleDateString('ru-RU', {day: 'numeric', month: 'long'})}</p>
              <p className="text-[18px] font-medium mt-0.5">{event.start_time ? event.start_time.slice(0, 5) : ''}</p>
            </div>
            <div className="flex flex-col">
                <div className="flex items-center">
                  <p className="text-[14px]">6/12</p>
                  <Svg viewBox="0 0 34 34" id="person-quantity-icon" className="w-6 h-6 ml-1" />
                </div>
                {
                  (!!event.average_rating || event.average_rating === 0) && (
                    <div className="flex items-start mt-0.5 self-end">
                      <p className="text-[14px] font-medium">{event.average_rating}</p>
                      <Svg id='rating-star' extraUseClass="!fill-current" className='w-[18px] h-[18px] ml-[7px]' />
                    </div>
                  )
                }
            </div>
          </div>
      </div>
  )
}
