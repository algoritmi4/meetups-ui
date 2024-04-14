import { IDay } from "./types";

export const daysArr: IDay[] = [
  { day_of_week: 'mon', time: '18:00' },
  { day_of_week: 'tue', time: '18:00' },
  { day_of_week: 'wed', time: '18:00' },
  { day_of_week: 'thu', time: '18:00' },
  { day_of_week: 'fri', time: '18:00' },
  { day_of_week: 'sat', time: '18:00' },
  { day_of_week: 'sun', time: '18:00' }
]

export const parityDayNames = {
  mon: 'Пн',
  tue: 'Вт',
  wed: 'Ср',
  thu: 'Чт',
  fri: 'Пт',
  sat: 'Сб',
  sun: 'Вс'
}
