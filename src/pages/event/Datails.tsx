import { getDateAndTime } from "@/entities/event/lib/getDateAndTime";
import { IEvent } from "@/entities/event/model/types";
import { Button } from "@/shared";
import { ReactElement } from "react";

interface IDetails {
    event: IEvent;
}

export function Details({event}: IDetails): ReactElement {
    const { eventDate, eventTime } = getDateAndTime(event.start_date);
    
    let categoryName = "";
    if (event.category?.name) {
        categoryName = event.category.name.charAt(0).toUpperCase() + event.category.name.slice(1);
    }

    const joinEvent = () => {
        // send POST request to  /events/{event_id}/register/
    }

    const addToFavorite = () => {
        // send POST request to  /events/{event_id}/register/
    }

    const openMemberList = () => {
        // send POST request to  /events/{event_id}/register/
    }
    
    return (
        <div className="event_details_page flex flex-col justify-between bg-custom-gray px-[40px] py-[30px] rounded-l-[10px]">
            <div>
                <h1 className="event_title font-semibold leading-[50px] text-[33px] text-neutral-800">{event.name}</h1>
                <div className="flex justify-between mb-[30px]">
                    <h2 className="event_category text-lg font-extralight text-indigo-700">{categoryName}</h2>
                    <Button HTMLType="button" type="secondary" iconType="heart" extraClass="w-[40px]"
                      onClick={addToFavorite}/>
                </div>
                

                <div className="event_details flex flex-col space-y-[18px] text-[22px] text-neutral-800">
                    <div className="flex">
                        <div
                            className='w-[32px] h-[32px] mr-[10px] bg-center bg-no-repeat bg-calendar'
                            style={{ backgroundImage: `url("/images/calendar.svg")` }}
                        />
                        {eventDate}
                        <div
                            className='ml-[15px] w-[32px] h-[32px] mr-[10px] bg-center bg-no-repeat bg-clock'
                            style={{ backgroundImage: `url("/images/clock.svg")` }}
                        />
                        <p>{eventTime}</p>
                    </div>
                    <div className="event_price flex">
                        <div
                            className='w-[32px] h-[32px] mr-[10px] bg-center bg-no-repeat bg-clock'
                            style={{ backgroundImage: `url("/images/dollar.svg")` }}
                        />
                         { event.free ? "Бесплатно" : event.cost }
                    </div>
                    <address className="flex text-[18px] font-extralight">
                        <div className='shrink-0 w-[32px] h-[32px] mr-[10px] bg-center bg-no-repeat bg-location'
                            style={{ backgroundImage: `url("/images/marker.svg")` }}/>
                        <p>{event.address}</p>
                    </address>
                </div>
            </div>

            <div className="event_actions flex flex-col space-y-[12px] self-stretch">
                <div className="flex justify-between">
                    <Button HTMLType='submit' type='primary' onClick={joinEvent}
                        extraClass='h-[44px] w-[210px]'>Присоединиться</Button>
                   <div className="flex">
                        <div className="flex flex-col justify-center">
                            <p className="text-[22px] text-neutral-800 mr-[10px]">Уже идут: {event.participants_number}</p>
                        </div>
                        <div className="flex flex-col justify-center">
                            <Button HTMLType="submit" type='secondary' onClick={openMemberList}
                                extraClass="h-[32px] w-[32px]" extraIconClass="h-[32px] w-[32px]" iconType="user-profile-group-lg"/>
                            {/* <div
                                className='w-[32px] h-[32px] bg-center bg-no-repeat bg-clock'
                                style={{ backgroundImage: `url("/images/user-profile-group-lg.svg")` }}
                            /> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
